<template>
    <div>
        <el-upload action="//api.xiaogongkeji.net/xiaogong/image/uploadImage" type="drag" :multiple="true" :on-preview="handlePreview" :data="extraData" name="img" :default-file-list="fileList" :on-remove="handleRemove" :thumbnail-mode="true" :on-success="ok">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            <div class="el-upload__tip" slot="tip">{{ur}}</div>
        </el-upload>
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
                ur: '如果我能成功，地址在这给你'
            };
        },
        methods: {
            ok(response, file, fileList) {
                console.log(response, file, fileList);

                let that = this
                console.log('http://og07ks0jb.bkt.clouddn.com/' + file.response.obj);
                that.ur = '上传成功！地址：' + 'http://og07ks0jb.bkt.clouddn.com/' + file.response.obj;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {

                console.log(file);

            }
        },
        created() {
            let that = this
            that.extraData.tokennum = localStorage.getItem('tokennum')
        }
}
</script>
