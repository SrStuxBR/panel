import React, { useEffect, useState } from 'react';
import { Server } from '@/api/server/getServer';
import getServers from '@/api/getServers';
import ServerRow from '@/components/dashboard/ServerRow';
import Spinner from '@/components/elements/Spinner';
import PageContentBlock from '@/components/elements/PageContentBlock';
import useFlash from '@/plugins/useFlash';
import { useStoreState } from 'easy-peasy';
import { usePersistedState } from '@/plugins/usePersistedState';
import Switch from '@/components/elements/Switch';
import tw from 'twin.macro';
import useSWR from 'swr';
import { PaginatedResult } from '@/api/http';
import Pagination from '@/components/elements/Pagination';
import { useLocation } from 'react-router-dom';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import Avatar from '@/components/Avatar';

export default () => {
    const { search } = useLocation();
    const defaultPage = Number(new URLSearchParams(search).get('page') || '1');

    const [page, setPage] = useState(!isNaN(defaultPage) && defaultPage > 0 ? defaultPage : 1);
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const uuid = useStoreState((state) => state.user.data!.uuid);
    const user = useStoreState((state) => state.user.data!.username);
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [showOnlyAdmin, setShowOnlyAdmin] = usePersistedState(`${uuid}:show_all_servers`, false);

    const { data: servers, error } = useSWR<PaginatedResult<Server>>(
        ['/api/client/servers', showOnlyAdmin && rootAdmin, page],
        () => getServers({ page, type: showOnlyAdmin && rootAdmin ? 'admin' : undefined })
    );

    useEffect(() => {
        if (!servers) return;
        if (servers.pagination.currentPage > 1 && !servers.items.length) {
            setPage(1);
        }
    }, [servers?.pagination.currentPage]);

    useEffect(() => {
        // Don't use react-router to handle changing this part of the URL, otherwise it
        // triggers a needless re-render. We just want to track this in the URL incase the
        // user refreshes the page.
        window.history.replaceState(null, document.title, `/${page <= 1 ? '' : `?page=${page}`}`);
    }, [page]);

    useEffect(() => {
        if (error) clearAndAddHttpError({ key: 'dashboard', error });
        if (!error) clearFlashes('dashboard');
    }, [error]);

    return (
        <PageContentBlock title={'Dashboard'} showFlashKey={'dashboard'}>
            <div className="homeBg">
                <div style={{paddingTop:'10px'}}>
                    <h2>Hi {user},</h2>
                    <h1>Welcome back!</h1>
                </div>

                <div className="waves">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#333" fill-opacity="1" d="M0,224L30,218.7C60,213,120,203,180,192C240,181,300,171,360,186.7C420,203,480,245,540,250.7C600,256,660,224,720,229.3C780,235,840,277,900,272C960,267,1020,213,1080,197.3C1140,181,1200,203,1260,218.7C1320,235,1380,245,1410,250.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#333" fill-opacity="1" d="M0,224L30,218.7C60,213,120,203,180,192C240,181,300,171,360,186.7C420,203,480,245,540,250.7C600,256,660,224,720,229.3C780,235,840,277,900,272C960,267,1020,213,1080,197.3C1140,181,1200,203,1260,218.7C1320,235,1380,245,1410,250.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#333" fill-opacity="1" d="M0,224L30,218.7C60,213,120,203,180,192C240,181,300,171,360,186.7C420,203,480,245,540,250.7C600,256,660,224,720,229.3C780,235,840,277,900,272C960,267,1020,213,1080,197.3C1140,181,1200,203,1260,218.7C1320,235,1380,245,1410,250.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#333" fill-opacity="1" d="M0,224L30,218.7C60,213,120,203,180,192C240,181,300,171,360,186.7C420,203,480,245,540,250.7C600,256,660,224,720,229.3C780,235,840,277,900,272C960,267,1020,213,1080,197.3C1140,181,1200,203,1260,218.7C1320,235,1380,245,1410,250.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
                </div>
            </div>
            <div className="homeServers">
                <h2>Supported games</h2>
                <div className="tarifBox">
                    <div className="tarif">
                        <img src="/themes/enigma_premium/img/minecraft_logo.png" alt="" />
                        <h2>Minecraft</h2>
                        <p>You can rent a minecraft server on our hosting</p>
                        <a href="#">Order server</a>
                    </div>
                    <div className="tarif">
                        <img src="/themes/enigma_premium/img/gta_logo.png" alt="" />
                        <h2>GTA 5</h2>
                        <p>You can rent a GTA server on our hosting</p>
                        <a href="#">Order server</a>
                    </div>
                    <div className="tarif">
                        <img style={{borderRadius:'10px'}} src="/themes/enigma_premium/img/rust_logo.jpeg" alt="" />
                        <h2>Rust</h2>
                        <p>You can rent a Rust server on our hosting</p>
                        <a href="#">Order server</a>
                    </div>
                    <div className="tarif">
                        <img style={{borderRadius:'10px'}} src="/themes/enigma_premium/img/csgo_logo.jpg" alt="" />
                        <h2>CS:GO</h2>
                        <p>You can rent a CS GO server on our hosting</p>
                        <a href="#">Order server</a>
                    </div>
                </div>
                <h2>Your servers</h2>
                <div className="w-full flex justify-between items-center mb-4 relative">
                    <SearchContainer/>
                    {rootAdmin &&
                    <div css={tw`flex justify-end items-center`} className="switcher w-fit absolute" style={{top:'10px',right:'0'}}>
                        <p css={tw`uppercase text-xs text-neutral-400 mr-2`}>
                            {showOnlyAdmin ? 'Showing others\' servers' : 'Showing your servers'}
                        </p>
                        <Switch
                            name={'show_all_servers'}
                            defaultChecked={showOnlyAdmin}
                            onChange={() => setShowOnlyAdmin(s => !s)}
                        />
                    </div>
                    }
                </div>
                <div className="clear"></div>
                {!servers ?
                    <Spinner centered size={'large'}/>
                    :
                    <Pagination data={servers} onPageSelect={setPage}>
                        {({ items }) => (
                            items.length > 0 ?
                                items.map((server, index) => (
                                    <ServerRow
                                        key={server.uuid}
                                        server={server}
                                        className="serverRow"
                                        css={index > 0 ? tw`mt-2` : undefined}
                                    />
                                ))
                                :
                                <p css={tw`text-center text-sm text-neutral-400`}>
                                    {showOnlyAdmin ?
                                        'There are no other servers to display.'
                                        :
                                        'There are no servers associated with your account.'
                                    }
                                </p>
                        )}
                    </Pagination>
                }
            </div>
            <div className="homeAds">
            <iframe src="https://discord.com/widget?id=896736801807560754&theme=dark" width="100%" height="350" allowTransparency={true} frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </div>
            <div className="clear"></div>
        </PageContentBlock>
    );
};
