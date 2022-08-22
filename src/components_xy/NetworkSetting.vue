<template>
    <div id="main">
        <div id="network_set">
          <div id="network_title"><span>网络配置</span></div>

          <div id="network_info">

            <div id="network_ip_pattern" class="nework_cell">
              <span>模式：</span>
              <div class="n_input">
                <el-select v-model="pattern_val" class="m-2" size="large" @change="ModSelect">
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
                <el-select v-model="card_val" class="m-2" placeholder="Select" size="large" @change="CardSelect">
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

            <div id="network_router" class="nework_cell">
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
            </div>

          </div>

          <div id="network_save">
            <el-button id="save_button" type="success" size="large" @click="Save">保存</el-button>
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
    this.CardSelect();
  },
  methods: {
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
    Save() {
      var n_pattern = this.pattern_val;
      var n_card = this.card_val;
      var n_ip_addr = this.ip_addr;
      var n_mask_addr = this.mask_addr;
      var n_gateway_addr = this.gateway_addr;
      var n_dns_addr = this.dns_addr;
      var n_router  = this.router_val;
      if (confirm("确定要更改IP吗？")) {
        ajax.get('/api/v1/network/setting',{params:{"pattern": n_pattern, "networkcard": n_card,
                                                   "ip":n_ip_addr,"maskaddr":n_mask_addr,
                                                   "gateway":n_gateway_addr,"dns":n_dns_addr, "router":n_router}}).then((res) => {
          if(res["data"]["code"] !== 2200){
              _this.$message.error("更改IP失败！");
          }
        });
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
      let param = {"networkcard": _this.card_val};
      ajax.get("/api/v1/network/get_ip", {params: param}).then(function (res) {
          let data = res.data;
          if (data.code === 2200){
              console.log(data);
              _this.ip_addr = data["data"]["IpAddr"];
              _this.mask_addr = data["data"]["IpMask"];
              _this.gateway_addr = data["data"]["IpGateway"];
              _this.dns_addr = data["data"]["IpDNS"];
          }
      });
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
