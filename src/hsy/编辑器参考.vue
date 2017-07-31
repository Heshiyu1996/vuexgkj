<template>
    <div>
        <v-editor :input-content="inputContent" :upload-url="uploadURL" v-model="outputContent"></v-editor>
        <el-button type="primary" @click="submit()">提交</el-button>
        <div v-html="datas">
        </div>
    </div>
</template>
<script>
import Editor from './Editor'
export default {
    data() {
            return {
                datas: '',
                // input content to editor 初始内容为空
                inputContent: '',
                // output content from editor 输出
                outputContent: '',
                // set image upload api url
                uploadURL: '//api.xiaogongkeji.net/xiaogong/image/uploadImage'
            }
        },
        computed: {},
        ready() {},
        attached() {},
        methods: {
            submit() {
                let that = this
                console.log(this.outputContent)
                that.datas = (this.outputContent)

            },

        },
        components: {
            'v-editor': Editor
        }
}
</script>
