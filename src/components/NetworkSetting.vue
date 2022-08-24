<template>
    <div id="main">
        <div id="network_set">
          <div id="network_title"><span>网络配置</span></div>

          <div id="network_info">

            <div id="network_ip_pattern" class="nework_cell">
              <span>模式：</span>
              <div class="n_input">
                <el-select v-model="pattern_val" class="m-2" size="large" @change="ModSelect" style="width: 32%;">
                    <el-option
                    v-for="item in pattern_opt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
              </div>
            </div>

            <div id="network_card" class="nework_cell">
              <span>网卡选择：</span>
              <div class="n_input">
                <el-select v-model="card_val" class="m-2" placeholder="Select" size="large" @change="CardSelect" style="width: 32%;">
                    <el-option
                    v-for="item in card_opt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
              </div>
            </div>

            <div id="network_ip_addr" class="nework_cell">
              <span>IP地址：</span>
              <div class="n_input">
<!--                <ip-addr-input ref="ip" v-model="ip_addr" @update-val="OnIpAddr"></ip-addr-input>-->
                <el-input ref="ip" v-model="ip_addr" @update-val="OnIpAddr" style="width: 32%;"></el-input>
<!--                <div class="is-disabled"></div>-->
              </div>
            </div>

            <div id="network_ip_mask" class="nework_cell">
              <span>IP子网掩码：</span>
              <div class="n_input">
                <el-input v-model="mask_addr" @update-val="OnIpMask" style="width: 32%;"></el-input>
<!--                <div class="is-disabled"></div>-->
              </div>
            </div>

            <div id="network_ip_gateway" class="nework_cell">
              <span>IP默认网关：</span>
              <div class="n_input">
                <el-input v-model="gateway_addr" @update-val="OnIpGateway" style="width: 32%;"></el-input>
<!--                <div class="is-disabled"></div>-->
              </div>
            </div>

            <div id="network_ip_dns" class="nework_cell">
              <span>DNS服务器：</span>
              <div class="n_input">
                <el-input v-model="dns_addr" @update-val="OnIpDNS" style="width: 32%;"></el-input>
<!--                <div class="is-disabled"></div>-->
              </div>
            </div>

            <!-- <div id="network_router" class="nework_cell">
              <span>默认路由：</span>
              <div class="n_input">
                <el-select v-model="router_val" class="m-2" placeholder="Select" size="large">
                    <el-option
                    v-for="item in router_opt"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
              </div>
            </div> -->

          </div>

          <div id="network_save">
            <!-- <router-link to="" @click.native ="jumpTo(scope.row.subnetUrl)" class="link-type">
            <span>{{scope.row.subnetUrl}}</span>
          </router-link> -->

            <router-link to="" @click.native ="jumpTo(ip_addr)" class="link-type">
              <el-button id="save_button" type="primary" size="large" @click="Save">保存</el-button>
            </router-link>
          </div>
        </div>
    </div>
    <!-- <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        />
    </el-select> -->
</template>

<script>
import IpAddrInput from './IpAddrInput.vue';
// import IpAddrInput from '@/components/IpAddrInput';
import ajax from "axios"
import $ from "jquery"
import { Notification } from 'element-ui';
import * as API from '@/api/system/';

export default {
  components: {
    IpAddrInput
  },
  data(){
    return{
      // pattern: "静态IP",
      pattern_opt : [
        // {
        //   value: 'dhcp',
        //   label: '自动获取',
        // },
        {
          value: 'static',
          label: '静态IP',
        },
      ],
      card_opt : [
        {
          value: 'eth0',
          label: 'eth0',
        },{
          value: 'eth1',
          label: 'eth1',
        },
      ],
      router_opt : [
        {
          value: '网卡1',
          label: '网卡1',
        },

      ],
      pattern_val: "静态IP",
      card_val: "eth0",
      router_val: "网卡1",
      ip_addr: "",
      mask_addr: "",
      gateway_addr: "",
      dns_addr: "",
    }
  },

  mounted() {
    console.log(window.location)
    this.CardSelect();
  },
  methods: {
    notify: function(title, msg, err_type) {
			Notification({ title: title, message: msg, type: err_type });
		},
    jumpTo(ip) {
      // console.log("location:", window.location.protocol)
        // var url = "http://"+ ip + ":10225/api/v1";
        // window.open(url,"_self");
        // window.location.href = "http://"+ ip + ":10225/api/v1";
        window.location.hostname = ip
    },
    OnIpAddr(data){
      this.ip_addr = data
    },
    OnIpMask(data){
      this.mask_addr = data
    },
    OnIpGateway(data){
      this.gateway_addr = data
    },
    OnIpDNS(data){
      this.dns_addr = data
    },

    VaildIp(ip_addr) {
      if (ip_addr === '') {
        return true
      }
      console.log("addr: ", ip_addr)
      const regexp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if ((!regexp.test(ip_addr)) && ip_addr !== '') {
        return false
      } else {
        return true
      }
    },

    Save() {
      var data =  {
        pattern: this.pattern_val,    // 配置IP模式
        network_card: this.card_val,   // 配置网卡
        ip: this.ip_addr,             // 配置IP
        mask_addr: this.mask_addr,     // 配置掩码
        gateway: this.gateway_addr,   // 配置网关
        dns: this.dns_addr,           // 配置DNS
        router: this.router_val       // 配置路由
      }
      
      var ipbool = this.VaildIp(data.ip)
      var maskbool = this.VaildIp(data.mask_addr)
      var gatewaybool = this.VaildIp(data.gateway)
      var dnsbool = this.VaildIp(data.dns)

      if(ipbool && maskbool && gatewaybool && dnsbool){
        if (confirm("确定要更改IP吗？")) {
          API.SetNetwork(data).then((res) => {
            if (res["code"] === 2200){
              this.notify("成功","修改完成！","success")
            }else{
              this.notify("错误",res["msg"],"error")
            }
          }).catch(error => console.log(error))
        }
      } else {
          this.notify("提示","请输入正确的IP格式, 如：192.168.0.100","info")
          return false
      }

    },
    ModSelect(){
      if (this.pattern_val === "static") {
        $(".is-disabled").css("display", "none");
      }else{
        $(".is-disabled").css("display", "block");
      }
    },
    CardSelect() {
      let _this = this;

      var data =  {
        network_card: _this.card_val
      }
      API.GetNetwork(data).then((res) => {
        console.log("code：", res["code"])

        if (res["code"] === 2200){
          _this.ip_addr = res["data"]["ip_addr"];
          _this.mask_addr = res["data"]["mask_addr"];
          _this.gateway_addr = res["data"]["gateway"];
          _this.dns_addr = res["data"]["dns"];
          console.log("ip:", _this.ip_addr)
          console.log("mask_addr:", _this.mask_addr)
        } else {
          console.log("获取IP地址失败！")
        }
      }).catch(error => console.log(error))

      // let param = {"networkcard": _this.card_val};
      // ajax.get("/api/v1/network/get_ip", {params: param}).then(function (res) {
      //     let data = res.data;
      //     if (data.code === 2200){
      //         console.log(data);
      //         _this.ip_addr = data["data"]["IpAddr"];
      //         _this.mask_addr = data["data"]["IpMask"];
      //         _this.ga)teway_addr = data["data"]["IpGateway"];
      //         _this.dns_addr = data["data"]["IpDNS"];
      //     } else {
      //         _this.$message.error("获取IP地址失败！");
      //     }
      // });
    }
  },


}
</script>

<style scoped>
#main {
  width: 100%;
  height: 100%;
  /* background: rgb(141, 115, 115); */
}

#network_set {
  width: 90%;
  height: 90%;
  /* background: red; */
}
#network_title {
  width: 10%;
  height: 5%;
  top: 2%;
  left: 2%;
  display: table;
  /* background: red; */
}
#network_save {
  width: 100%;
}

#network_info {
  width: 80%;
  height: 80%;
  top: 8%;
  left: 6%;
  /* background: sblue; */
  /* float: left; */
  display: table;
}

#network_title span {
  /* background: blue; */
  display:table-cell;
  text-align: center;
  vertical-align: middle;
}

.nework_cell {
  width: 100%;
  height: 10%;
  display: table-cell;
  /* background: red; */
  float: left;
}
.nework_cell span{
  width:13%;
  /* height: 100%; */
  /* border:1px solid; */
  /* display:block; */
  float: left;
  left: 1%;
  position: relative;
  top: 18%;
}
.nework_cell .n_input {
  width: 80%;
  float: left;
  left: 5%;
  /* border:1px solid; */
}

#save_button {
  display:block;
  margin:0 auto;
}
  .is-disabled{
    width: 29.3%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    position: absolute;
    z-index: 9;
    top: 0;
    cursor: no-drop;
  }
</style>
