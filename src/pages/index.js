import { Suspense, useEffect, } from 'react';
import { Skeleton } from 'antd'
import { Route, Switch, } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";

import { useFetch, } from '@com'
import { routerConfig } from './routerList';
import { RootContext } from './rootContext';
import Layout from '@components/Layout/index';
import Ding from '@img/ding.mp3';

// 根据路由判断平台来源
let exeToken = null;
try {
    exeToken = ccwin.getYSToken();
} catch (e) {
    exeToken = util.getCookie('t');
}
if (exeToken) {
    util.setToken(exeToken);
    sessionStorage.setItem('exeToken', 1);
}
export default () => {
    const dispatch = useDispatch ();
    const { isTZd,isZHshAdmin,isTShKpi } = util.role;
    const routes = Object.entries(routerConfig);

    const { data = {}, mutate, } = useFetch('/account/currentUser', {
        data: {},
        cacheKey: '/account/currentUser',
        staleTime: 2000,
        onSuccess(data) {
            if (data.avatar) {
                data.name = data.displayName ? data.displayName : data.username;
                data.touImg = data.downUrl + data.avatar;
                data.touImgBig = data.downUrl + data.avatar1;
            } else {
                data.name = data.displayName ? data.displayName : data.username;
                data.touImg = '';
                data.touImgBig = '';
            }
            localStorage.setItem('userId', data.uniqId);
            localStorage.setItem('imUrl', data.imUrl);
            localStorage.setItem('imPath', data.imPath);
            util.userInformation(data);
        }
    })
    const thirdList = async () => {
        try{
            let ret = await request.post('/third/third_mer_list');
            if(ret.code === 200) {
                dispatch ({
                    type: 'third/thirdListData',
                    thirdListData: ret.data,
                })
            }
        }catch(err){}
    }
   
    useEffect(() => {
        if(isTZd||isZHshAdmin||isTShKpi){
            thirdList()
        }
        if(isZHshAdmin||isTShKpi){
          
        }
    }, []);
    return (
        <RootContext.Provider value={{
            menus: data.resources,
            clearMenu: ()=>mutate({}),
        }}>
            <div className="body-main">
                <Layout>
                    <Suspense
                        fallback={
                            <Skeleton style={{ margin: '20px 20px 0 20px' }}
                                avatar
                                paragraph={{ rows: 4 }} />
                        }>
                        <Switch>
                            {
                                routes.map(([path, it]) => (
                                    <Route
                                        exact={it.index}
                                        path={path}
                                        key={path}
                                        component={it.component} />
                                ))
                            }
                        </Switch>
                    </Suspense>
                </Layout>
                <audio src={Ding} hidden id="audio">
                    您的浏览器不支持 audio 标签。
                </audio>
            </div>
        </RootContext.Provider>
    )
}