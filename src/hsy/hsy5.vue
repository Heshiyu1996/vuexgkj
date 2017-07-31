<template>
    <div>
        <el-upload action="//api.xiaogongkeji.net/xiaogong/image/uploadImage" :default-file-list="fileList" :show-upload-list="false" :data="extraData" name="img" :on-success="ok">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div style="border:2px solid orange;width:200px;height:200px">
            <img v-if="showOn" :src="picPath_Msg" style="width:190px;height:190px">
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                fileList: [],
                extraData: {
                    type: 1,
                    tokennum: ''
                },
                showOn: false
            }
        },
        methods: {
            ok(response, file, fileList) {
                console.log(response, file, fileList);
                let that = this
                console.log('http://og07ks0jb.bkt.clouddn.com/' + file.response.obj);
                that.showOn = false
                that.showOn = true
                that.picPath_Msg = 'http://og07ks0jb.bkt.clouddn.com/' + file.response.obj;
            },
        },
        created() {
            let that = this
            that.extraData.tokennum = localStorage.getItem('tokennum')
            console.log(that.extraData.tokennum)
        }
}
</script>
