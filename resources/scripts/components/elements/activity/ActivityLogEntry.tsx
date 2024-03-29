import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import Translate from '@/components/elements/Translate';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { ActivityLog } from '@definitions/user';
import ActivityLogMetaButton from '@/components/elements/activity/ActivityLogMetaButton';
import { FolderOpenIcon, TerminalIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import style from './style.module.css';
import Avatar from '@/components/Avatar';
import useLocationHash from '@/plugins/useLocationHash';
import { getObjectKeys, isObject } from '@/lib/objects';

interface Props {
    activity: ActivityLog;
    children?: React.ReactNode;
}

function wrapProperties(value: unknown): any {
    if (value === null || typeof value === 'string' || typeof value === 'number') {
        return `<strong>${String(value)}</strong>`;
    }

    if (isObject(value)) {
        return getObjectKeys(value).reduce((obj, key) => {
            if (key === 'count' || (typeof key === 'string' && key.endsWith('_count'))) {
                return { ...obj, [key]: value[key] };
            }
            return { ...obj, [key]: wrapProperties(value[key]) };
        }, {} as Record<string, unknown>);
    }

    if (Array.isArray(value)) {
        return value.map(wrapProperties);
    }

    return value;
}

export default ({ activity, children }: Props) => {
    const { pathTo } = useLocationHash();
    const actor = activity.relationships.actor;
    const properties = wrapProperties(activity.properties);

    return (
        <div className={'flex justify-between items-center pb-1 border-b-2 border-gray-800 last:border-0'}>
            <div>
                <div className={'flex items-center text-gray-50'}>
                    <Tooltip placement={'top'} content={actor?.email || 'System User'}>
                        <span>{actor?.username || 'System'}</span>
                    </Tooltip>
                    <span className={'text-gray-400'}>&nbsp;&mdash;&nbsp;</span>
                    <Link
                        to={`#${pathTo({ event: activity.event })}`}
                        className={'transition-colors duration-75 active:text-cyan-400 hover:text-cyan-400'}
                    >
                        {activity.event}
                    </Link>
                    <div className={classNames(style.icons, 'group-hover:text-gray-300 ml-2')}>
                        {activity.isApi && (
                            <Tooltip placement={'top'} content={'Using API Key'}>
                                <TerminalIcon />
                            </Tooltip>
                        )}
                        {activity.event.startsWith('server:sftp.') && (
                            <Tooltip placement={'top'} content={'Using SFTP'}>
                                <FolderOpenIcon />
                            </Tooltip>
                        )}
                        {children}
                    </div>
                </div>
                <p className='text-sm opacity-50'>
                    <Translate ns={'activity'} values={properties} i18nKey={activity.event.replace(':', '.')} />
                </p>
            </div>

            <div className={'text-sm text-right'}>
                {activity.ip && (
                    <span className="block relative">
                        {activity.ip}
                    </span>
                )}
                <Tooltip placement={'left'} content={format(activity.timestamp, 'MMM do, yyyy H:mm:ss')}>
                    <span>{formatDistanceToNowStrict(activity.timestamp, { addSuffix: true })}</span>
                </Tooltip>
            </div>
            {activity.hasAdditionalMetadata && <ActivityLogMetaButton meta={activity.properties} />}
        </div>
    );
};
