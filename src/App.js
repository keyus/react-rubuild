import { ConfigProvider, } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';


export default () => {
    return (
        <ConfigProvider locale={zh_CN}>
            <div>test</div>
        </ConfigProvider>
    )
}


