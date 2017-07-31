
              <template>
                <div style="width:210px;height:205px;float:left;margin-bottom:45px">
                  <router-link :to="'/Patent/auctionInfo/' + id_Msg">
                      <el-card class="box-card" :body-style="{ padding: '0px' }">
                        <img :src="img_Msg" class="image">
                        <div style="padding:5px;">
                          <div style="float:left;width:10px">
                             <el-tag v-if="true" type="danger"> 拍卖品</el-tag>
                          </div>
                          <div style="text-align:right;float:right;width:165px;"id="price" >
                          <div style="font-weight:bolder;font-size:22px;width:120px;float:right;line-height:25px;color:rgb(230, 94, 64)" class="omit" >
                              ¥ {{price_Msg}}
                          </div>
                          </div>
                          <div id="name" class="omit" style="width:150px;height:30px;float:left">{{name_Msg}}</div>
                          <div class="bottom clearfix">
                            <div class="purpose omit" id="purpose">{{purpose_Msg}}</div>
                          </div>
                        </div>
                      </el-card>
                  </router-link>
                </div>
              </template>

<script>
  import axios from 'axios'
  import config from './../../publicAPI/config'

    export default{
      props:['name','id','img','purpose'],
      data(){
        return{
            rootURL:config.URL,
            name_Msg:this.name,
            price_Msg:'110',
            purpose_Msg:this.purpose,
            status_Msg:'s',
            id_Msg:this.id,
            img_Msg:this.img,
        }
      },
      methods:{
      },
      created(){
      },
        watch:{
          name(val) {
          //  alert(val);//监听外部对props属性name的变更，并同步到组件内的data属性myResult中
           this.name_Msg=val
          },
          id(val) {
           this.id_Msg=val
          },
          img(val) {
           this.img_Msg=val
          },
          purpose(val) {
           this.purpose_Msg=val
           console.log(this.purpose_Msg)
          },
        }
    }

  </script>

  <style scoped>
    .purpose {
      font-size: 13px;
      color: #999;
    }
    .omit{
      line-height: 35px;
      width:200px;
      height:25px;
      overflow: hidden;
      vertical-align: top;
      text-overflow:ellipsis;
      white-space: nowrap;/*不换行*/
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 210px;
      height:140px;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
  </style>
