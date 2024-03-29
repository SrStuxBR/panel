import * as React from 'react';
import ContentBox from '@/components/elements/ContentBox';
import UpdatePasswordForm from '@/components/dashboard/forms/UpdatePasswordForm';
import UpdateEmailAddressForm from '@/components/dashboard/forms/UpdateEmailAddressForm';
import ConfigureTwoFactorForm from '@/components/dashboard/forms/ConfigureTwoFactorForm';
import PageContentBlock from '@/components/elements/PageContentBlock';
import tw from 'twin.macro';
import { breakpoint } from '@/theme';
import styled from 'styled-components/macro';
import MessageBox from '@/components/MessageBox';
import { useLocation } from 'react-router-dom';
import { useStoreState } from '@/state/hooks';
import { ApplicationStore } from '@/state';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/elements/button/index';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';

const Container = styled.div`
    ${tw`flex flex-wrap`};

    & > div {
        ${tw`w-full`};

        ${breakpoint('sm')`
      width: calc(50% - 1rem);
    `}

        ${breakpoint('md')`
      ${tw`w-auto flex-1`};
    `}
    }
`;

export default () => {
    const { state } = useLocation<undefined | { twoFactorRedirect?: boolean }>();
    const user = useStoreState((state) => state.user.data);
    const [menu, setMenu] = React.useState('api');

    return (
        <PageContentBlock title={'Account Overview'}>
            <div className="w-full flex">
                <div className="flex items-center mt-2">
                    <div className="accountAva">
                        <Avatar.User />
                    </div>
                    <div>
                        <p className="text-xl font-bold leading-5 flex items-start">
                            {user?.username}

                            {user?.rootAdmin && <span className="role">Administrator</span>}
                            
                        </p>
                        <p className="opacity-50 leading-5">
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>

            {state?.twoFactorRedirect && (
                <MessageBox title={'2-Factor Required'} type={'error'}>
                    Your account must have two-factor authentication enabled in order to continue.
                </MessageBox>
            )}

            <div className="w-full flex accountBlocks" style={{marginTop:'20px'}}>
            <div style={{minWidth:'500px'}} className="accountContAdapt">
            <div className="accountContainer" style={{width:'100%'}}>
                <p className="text-xl font-bold mb-3">Account information</p>
                <div className="w-full flex justify-between items-center">
                    <div>
                        <p className="text-sm opacity-50">Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <Button onClick={()=>{ setMenu('email'); }}>Edit</Button>
                </div>
                <div className="w-full flex justify-between items-center mt-3">
                    <div className="flex flex-wrap items-center">
                        <p className="text-sm opacity-50 w-full">Password</p>
                        <p>********</p>
                    </div>
                    <Button onClick={()=>{ setMenu('password'); }}>Change</Button>
                </div>
                <ConfigureTwoFactorForm />
            </div>
            <div className="accountContainer mt-2" style={{width:'100%'}}>
                <p className="text-xl font-bold mb-3">Activity logs</p>
                <ActivityLogContainer />
            </div>
            </div>
            <div className="accountRight accountContainer ml-3" style={{width:'100%',padding:'0'}}>
                <div className="accountSubmenu">
                    <p
                        onClick={()=>{ setMenu('api'); }}
                        className={menu == 'api' ? 'active' : ''}
                    >API</p>
                    <p
                        onClick={()=>{ setMenu('ssh'); }}
                        className={menu == 'ssh' ? 'active' : ''}
                    >SSH</p>
                    {menu == 'email' &&
                    <div
                        onClick={()=>{ setMenu('api'); }}
                        className="dopSettings"
                    >
                        Update email <span className="closeDop">x</span>
                    </div>}
                    {menu == 'password' &&
                    <div
                        onClick={()=>{ setMenu('api'); }}
                        className="dopSettings"
                    >
                        Change password <span className="closeDop">x</span>
                    </div>}
                </div>
                {menu == 'api' &&
                <div className="accountSettings">
                    <AccountApiContainer />
                </div>
                }
                {menu == 'ssh' &&
                <div className="accountSettings">
                    <AccountSSHContainer />
                </div>
                }
                {menu == 'email' &&
                <div className="accountSettings">
                    <UpdateEmailAddressForm />
                </div>
                }
                {menu == 'password' &&
                <div className="accountSettings">
                    <UpdatePasswordForm />
                </div>
                }
            </div>
            </div>
        </PageContentBlock>
    );
};
