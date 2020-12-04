<template>
  <footer>
    <div class="copy">
      <p>
        舒洪凡科技有限公司版权所有 丨 网络文化经营许可证：京网文[2015]0525-205号 | 信息网络传播视听节目许可证0109362号   丨 增值电信业务经营许可证B2-20090418 丨京ICP证060261号
      </p>
      <p>
        广播电视节目制作经营许可证京字第2037号 丨营业性演出许可证京市演1574  |  京公网安备11010502030216号
      </p>
      <p>
        举报电话：010-87939949丨 举报邮箱：shfshuhongfan@126.com
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="less">
.footer{
  margin-top: 62px;
  height: 220px;
  background: #282828;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  .card{
    width: 350px;
    margin-top: 30px;
    div.content{
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      a{
        width: 110px;
        height: 50px;
        color: grey;
        text-decoration: none;
      }
      a:hover{
        color: yellow;
      }
    }
    .download{
      text-align: center;
      a{
        height: 80px!important;
      }
    }
  }
}
.copy{
  font-size: 12px;
  font-weight: 400;
  height: 80px;
  padding: 22px 0 99px;
  background: #1f1f1f;
  text-align: center;
  color: grey;
  display: flex;
  flex-direction: column;
  p{
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: grey;
  }
}
</style>
