import { Upload, Icon, message } from 'antd';
import request from "../../util/request";
import  styles from '../../assests/css/color.css';
import ColorThief  from  '../../assests/js/color-thief';
import ColorList from '../containers/color/ColorList';
const defaultImg = require('../../assests/images/1.jpeg');
// var ColorThief = require('../../assests/js/color-thief');
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Color extends React.Component {
    state = {
        loading: false,
        src: defaultImg,
        colorArr: []
    };
    componentDidMount(){
        this.getImgPalette();

    }
    getImgPalette() {
        let colorThief = new ColorThief();
        let img = document.getElementById('img')
        img.onload = () =>{
            let list = colorThief.getPalette(img,6) ;
            this.setState({
                colorArr: list
            })
        }
    }
    checkImgType(ths) {
        try {
            var obj_file = ths;
            for(var i=0;i<obj_file.length;i++){
                if (!/\.(JPEG|JPG)$/.test(obj_file[i].name.toUpperCase())) {
                    message.error('仅支持JPG、JPEG格式');
                    return false;
                }
            }
        } catch (e) {
            console.log(e)
        }

        return true;
    }
    getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
    handleChange = () => {
        let isPic = this.checkImgType(document.getElementById('upload').files);
        if (isPic) {
            let src = this.getObjectURL(document.getElementById('upload').files[0])
            this.setState({
                src: src
            },() => {
                this.getImgPalette();
            })
        }
    }
    myupload = () =>{
        document.getElementById('upload').click();
    }
    render() {
        let list = this.state.colorArr
        return (
            <div className={styles.wrap}>
                <div className={styles.center}>
                    <div className={styles.imgwrap}>
                        <img src={this.state.src} alt="图片" id="img"/>

                    </div>

                </div>
                <div className={styles.left}>
                    <div className={styles.button} onClick={this.myupload}>上传图片</div>
                    <input id="upload" type="file" className={styles.fileiput} onChange={this.handleChange.bind(this)}/>

                </div>
                <div className={styles.right}>
                    {list.length > 0 ? <ColorList list={list}></ColorList> : null}
                </div>


            </div>

        );
    }
}

export default Color;