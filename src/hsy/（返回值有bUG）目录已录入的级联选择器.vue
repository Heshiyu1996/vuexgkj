<template>
  <div>
    <el-cascader
    placeholder="目 录 选 择"
    change-on-select
      @change="abc"
      :options="options"
    ></el-cascader>
</div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '1车身',
                    children: [{
                      value: '11',
                      label: '11配气机构',
                              children: [{
                                value: '25',
                                label: '25空气滤清器'
                              },]
                    }, {
                      value: '12',
                      label: '12车座',
                    }, {
                      value: '13',
                      label: '13外观设计',
                    }]
                    }, {
                      value: '2',
                      label: '2车灯',
                      children: [{
                        value: '14',
                        label: '14尾灯',
                      },{
                        value: '15',
                        label: '15前灯',
                      }]
                    }, {
                      value: '3',
                      label: '3发动机',
                            children: [{
                              value: '16',
                              label: '16冷却系统'
                            },{
                              value: '17',
                              label: '17动力装置'
                            }]
                    }, {
                      value: '4',
                      label: '4车架',
                            children: [{
                              value: '18',
                              label: '18悬架产品',
                              children: [{
                                value: '26',
                                label: '26轮圈'
                              },{
                                value: '27',
                                label: '27保险杆'
                              },{
                                value: '28',
                                label: '28安全杆'
                              }]
                            },{
                              value: '19',
                              label: '19转向系统',
                              children: [{
                                value: '29',
                                label: '29转向器'
                              }]
                            }]
                    }, {
                      value: '5',
                      label: '5喷漆',
                    }, {
                      value: '6',
                      label: '6底盘',
                    }, {
                      value: '7',
                      label: '7电气设备',
                            children: [{
                              value: '20',
                              label: '20安全装置'
                            },{
                              value: '21',
                              label: '21电器产品',
                              children: [{
                                value: '30',
                                label: '30遥控器'
                              },{
                                value: '31',
                                label: '31空调'
                              },{
                                value: '32',
                                label: '32音响设备'
                              },{
                                value: '33',
                                label: '33喇叭'
                              },{
                                value: '34',
                                label: '34汽车设备'
                              }]
                            }]
                    }, {
                      value: '8',
                      label: '8模型',
                            children: [{
                              value: '22',
                              label: '22汽车玩具'
                            },{
                              value: '23',
                              label: '23汽车模型'
                            }]
                    }, {
                      value: '9',
                      label: '9汽车库',
                            children: [{
                              value: '24',
                              label: '24层式汽车库'
                            }]
                    }, {
                      value: '10',
                      label: '10软件',
        }],
      };
    },
    methods:{
      abc(data){
        console.log(data)
      }
    }
  };
</script>
