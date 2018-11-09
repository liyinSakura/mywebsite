import { Card } from 'antd';
import Time from '../page/demo/Time'
export default () => {
    const style = {
        width: '400px',
        margin: '30px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        border: '1px solid #e8e8e8',
    };

    return (
        <div>
            <div>一个没有感情的时间众筹主页</div>
            <Time></Time>
        </div>

    );

}