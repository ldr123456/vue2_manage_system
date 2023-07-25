<!-- 用户登录信息卡片 -->
<template>
  <!-- 首页组件 -->
  <div>
    <!-- el-row：行布局容器 gutter 属性：设置栅格间隔距离。 -->
    <el-row :gutter="20">
      <!-- el-col：列布局容器，Element UI 将一个 el-row 容器分为 24 份，通过 el-col 来进行布局。
      span 属性：表示占据的列数的份额 -->
      <el-col :span="8">
        <!-- 用户登录信息卡片栏 -->
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <!-- 用户头像 -->
            <img src="../../assets/img/img.jpg" class="user-avator" alt="" />
            <div class="user-info-cont">
              <!-- 用户名 -->
              <div class="user-info-name">{{ name }}</div>
              <!-- 用户身份 -->
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：<span>2022-07-25</span>
          </div>
          <div class="user-info-list">上次登录地点：<span>新乡</span></div>
        </el-card>
        <!-- 编程语言卡片 -->
        <!-- shadow 属性：设置阴影显示时机。 -->
        <el-card shadow="hover" style="height: 252px">
          <div slot="header" class="clearfix"><span>语言详情</span></div>
          <!-- el-progress：进度条 percentage 属性：设置进度的百分比。 -->
          Vue
          <el-progress :percentage="71.3" color="#42b983"></el-progress>
          JavaScript
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
          CSS
          <el-progress :percentage="3.7"></el-progress>
          HTML
          <el-progress :percentage="0.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>

      <!-- 业务信息卡片 -->
      <el-col :span="16">
        <!-- 上半部分 -->
        <el-row :gutter="20" class="mgb20">
          <!-- 用户访问量卡片 -->
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <!-- 系统信息卡片 -->
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-lx-notice grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>

          <!-- 数量卡片 -->
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 待办事项卡片 -->
        <el-card shadow="hover" style="height: 403px">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <!-- :data 属性：绑定 data 对象 -->
          <el-table :data="todoList" :show-header="false" height="304" style="width: 100%; font-size: 14px">
            <!-- 当绑定 data 对象后，用 prop 属性来对应对象中的键名即可填入数据，用 label 属性来定义表格的列名 -->
            <el-table-column width="40">
              <!-- v-slot用于将对象里面的值取出来放置在插槽位置 -->
              <template v-slot="scope">
                <!-- 这个插槽设置复选框的初始状态 -->
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template v-slot="scope">
                <!-- 这个插槽放置data中的title属性值 -->
                <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template v-slot:="scope">
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表卡片 -->
    <el-row :gutter="20">
      <!-- 百分比图表 -->
      <el-col :span="8">
        <el-card shadow="hover" class="chart-fa">
          <div ref="pieRef" id="pie" class="main-chart"></div>
        </el-card>
      </el-col>

      <!-- 线性图表 -->
      <el-col :span="16">
        <el-card shadow="hover" class="chart-fa">
          <div ref="lineRef" id="line" class="main-chart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from "../../utils/bus";
// 引用 Echarts 图表库的组件
import * as echarts from "echarts/core";
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  GridComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { UniversalTransition } from "echarts/features";
import { LineChart } from "echarts/charts";
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  GridComponent,
  ToolboxComponent,
  LineChart,
  UniversalTransition,
]);

export default {
  name: "dashboard",
  // 需要用的数据：用户名、待办事项卡片、图表用模拟数据和不同配置
  data () {
    return {
      // 从本地存储获取用户名
      name: localStorage.getItem("ms_username"),
      // 待办事项卡片模拟数据
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false,
        },
        {
          title: "今天要修复100个bug",
          status: false,
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false,
        },
        {
          title: "今天要修复100个bug",
          status: false,
        },
        {
          title: "今天要修复100个bug",
          status: true,
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true,
        },
      ],
      // 图表公用模拟数据
      data: [
        {
          name: "2021/09/04",
          value: 1083,
        },
        {
          name: "2021/09/05",
          value: 941,
        },
        {
          name: "2021/09/06",
          value: 1139,
        },
        {
          name: "2021/09/07",
          value: 816,
        },
        {
          name: "2021/09/08",
          value: 327,
        },
        {
          name: "2021/09/09",
          value: 228,
        },
        {
          name: "2021/09/10",
          value: 1065,
        },
      ],
      pieChart: {},
      lineChart: {},
      // 图表一设置
      option: {
        title: {
          text: "每日时间安排",
          subtext: "简略版",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "看小说" },
              { value: 735, name: "敲代码" },
              { value: 580, name: "玩游戏" },
              { value: 484, name: "划水摸鱼" },
              { value: 300, name: "做总结" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      // 图表二设置
      option2: {
        title: {
          text: "Stacked Area Chart",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },

  computed: {
    role () {
      return this.name === "祥瑞" ? "超级管理员" : "普通会员";
    },
  },

  created () {
    this.handleListener();
    this.changeDate();
  },

  // 在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发
  activated () {
    this.handleListener();
  },
  mounted () {
    this.renderChart();
  },

  // 退出当前存在deactivated()函数页面时触发
  deactivated () {
    // 清除事件监听
    window.removeEventListener("resize", this.renderChart);
    // 清除监听
    bus.$off("collapse", this.handleBus);
  },

  methods: {
    // 同步当前时间
    changeDate () {
      // 获取 1970 年 1 月 1 日至今的毫秒数。
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        // 将data中的模拟数据转化为当前日期为基准的时间
        const date = new Date(now - (6 - index) * 86400000);
        // 将毫秒数转化为对应的日期时间并赋予给data.name，getMonth返回的是0~11所以要加1
        item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      });
    },
    // 监听浏览器尺寸
    handleListener () {
      // 通过bus监听事件，在接受数据后调用resizeHandle方法
      bus.$on("collapse", this.resizeHandle);
      // 通过事件监听，判定浏览器尺寸，调用resizeHandle方法对图表进行重新渲染
      window.addEventListener("resize", this.resizeHandle);
    },

    // 延迟刷新，形成过渡动画
    handleBus (msg) {
      setTimeout(() => {
        this.renderChart();
      }, 300);
    },
    // 对两个列表进行重新渲染
    renderChart () {
      this.pieChart = echarts.init(document.getElementById("pie"));
      this.lineChart = echarts.init(document.getElementById("line"));
      this.pieChart.setOption(this.option, true);
      this.lineChart.setOption(this.option2, true);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
/* 业务信息卡片 */
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
/* 用户登录信息 */
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}
/* 头像 */
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
/* 信息内容 */
.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}
/* 登录信息 */
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.chart-fa {
  width: 100%;
  height: 300px;
}
.main-chart {
  width: 100%;
  height: 300px;
}
</style>