<template>
  <el-card>
    <!--        面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/video' }">在线课程</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="7" v-for="(video, index) in videoList" :key="index" :offset="index >= 0 ? 1 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <VideoPlayer :imgurl="video.imgurl" :videourl="video.videourl"></VideoPlayer>
            <el-card>
              <span>{{ video.text }}</span>
              <div class="bottom clearfix">
                <el-tag type="warning">{{ video.time | dateformat }}</el-tag>
                <el-tooltip class="item" effect="dark" :content="'提取码：'+video.download_key" placement="top">
                  <el-link :href="video.download" type="primary" target="_blank">百度网盘地址</el-link>
                </el-tooltip>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import VideoPlayer from '../VideoPlayer/VideoPlayer'
export default {
  name: 'Video',
  data () {
    return {
      videoList: []
    }
  },
  created () {
    this.getVideoList()
  },
  methods: {
    async getVideoList () {
      const result = await this.axios.post('/video')
      // console.log(result)
      this.videoList = result !== undefined && result.data.datas
    }
  },
  components: {
    VideoPlayer
  }
}
</script>

<style scoped lang="less">
.el-card{
  .el-breadcrumb{
    margin-left: 60px;
    padding: 10px;
  }
}
.bottom{
  padding: 10px;
  .el-link{
    float: right;
  }
}
</style>
