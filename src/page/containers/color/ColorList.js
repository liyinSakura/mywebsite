import React from 'react';
import styles from '../../../assests/css/color.css';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
class ColorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : 1
        };
    }
    componentDidMount() {

    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    colorRGB2Hex(color) {
        var rgb = color.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);

        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    }

    render() {
        const listItems = this.props.list.map((item,index) =>
        {
            let coloritem = `RGB(${item[0]},${item[1]},${item[2]})`;
            let hexcoloritem = this.colorRGB2Hex(coloritem)
            return(
                <li key={index} className={styles.item}>
                <span className={styles.dot} style={{background: `rgb(${item[0]},${item[1]},${item[2]})`}}></span>
                    {this.state.value === 1? coloritem : hexcoloritem}
                </li>
                )

        }

        );
        return (
            <div>
                <div className={styles.radiowrap}>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>RGB</Radio>
                        <Radio value={2}>HEX</Radio>
                    </RadioGroup>
                </div>

                <ul className={styles.rightul}>
                    {listItems}
                </ul>
            </div>

        );
    }
}



export default ColorList;