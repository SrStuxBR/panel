import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLayerGroup, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import tw, { theme } from 'twin.macro';
import styled from 'styled-components/macro';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import Avatar from '@/components/Avatar';

const RightNavigation = styled.div`
    & > a,
    & > button,
    & > .navigation-link {
        ${tw`flex items-center h-full no-underline text-neutral-300 px-6 cursor-pointer transition-all duration-150`};

        &:active,
        &:hover {
            ${tw`text-neutral-100 bg-black`};
        }

        &:active,
        &:hover,
        &.active {
            box-shadow: inset 0 -2px ${theme`colors.cyan.600`.toString()};
        }
    }
`;

export default () => {
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };
    const [mobile, setMobile] = React.useState('closed');

    return (
        <div className={'leftMenu '+mobile}>
            {mobile == 'closed' &&
                <div onClick={()=>{ setMobile('opened'); }} className="mobileMenuOpen">
                    <FontAwesomeIcon icon={faBars} />
                </div>
            }
            {mobile == 'opened' &&
                <div onClick={()=>{ setMobile('closed'); }} className="mobileMenuOpen">
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            }
            <div className={'bg-neutral-900 leftMenuFixed'}>
            <SpinnerOverlay visible={isLoggingOut} />
            <div className={'mx-auto w-full'}>
                <Link
                    to={'/'}
                    className={
                        'leftLogo text-xl font-header no-underline text-neutral-200 hover:text-neutral-100 transition-colors duration-150'
                    }
                >
                    {name}
                </Link>
                <RightNavigation className={'leftMenuContent'}>
                    <p className="subcategory">General</p>
                    <NavLink to={'/'} exact>
                        <FontAwesomeIcon icon={faLayerGroup} />
                        <p className="ml-2">My servers</p>
                    </NavLink>
                    <NavLink to={'/account'}>
                        <div className={'w-6 h-6 rounded-md'}>
                            <Avatar.User />
                        </div>
                        <p className="ml-2">My profile</p>
                    </NavLink>
                    <button onClick={onTriggerLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <p className="ml-2">Logout</p>
                    </button>
                    <p className="subcategory">Admin control</p>
                    {rootAdmin && (
                        <a href={'/admin'} rel={'noreferrer'}>
                            <FontAwesomeIcon icon={faCogs} />
                            <p className="ml-2">Admin panel</p>
                        </a>
                    )}
                </RightNavigation>
            </div>
            </div>
        </div>
    );
};
