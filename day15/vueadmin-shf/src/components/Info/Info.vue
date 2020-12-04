<template>
  <el-card>
    <el-row :gutter="24" slot="header">
      <el-col :span="8">
        <!--        面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/info' }">学生信息管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="8">
        <el-input class="search" v-model="search" style="display: inline-block;width: 100%" placeholder="请输入 用户名 进行搜索"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button @click="adduser" type="primary" round style="float: right; padding: 3px 10px">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      stripe
      border
      :data="tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        sortable
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        sortable
        prop="username"
        label="用户名"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="mobile"
        label="电话"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="gender"
        label="性别"
        width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.gender==1">男</span>
          <span v-if="scope.row.gender==2">女</span>
          <span v-if="scope.row.gender==3">保密</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="email"
        label="邮箱"
        width="400">
      </el-table-column>
      <el-table-column
        sortable
        prop="status"
        label="是否在校"
        width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==1" type="success">在校</el-tag>
          <el-tag v-if="scope.row.status==2" type="danger">离校</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
<!--    修改-->
    <el-dialog title="学生信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="id" label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input clearable show-password type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="password2" label="确认密码" :label-width="formLabelWidth">
          <el-input clearable show-password type="password" v-model="form.password2" autocomplete="off" placeholder="请重新输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
            <el-option label="保密" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择是否在校">
            <el-option label="在校" value="1"></el-option>
            <el-option label="离校" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
<!--    添加-->
    <el-dialog title="学生信息添加" :visible.sync="dialogFormVisible2">
      <el-form :model="addForm" :rules="rulesAdd" ref="ruleForm2">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input clearable show-password type="password" v-model="addForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="password2" label="确认密码" :label-width="formLabelWidth">
          <el-input clearable show-password type="password" v-model="addForm.password2" autocomplete="off" placeholder="请重新输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="电话" :label-width="formLabelWidth">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
          <el-select v-model="addForm.gender" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
            <el-option label="保密" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
          <el-select v-model="addForm.status" placeholder="请选择是否在校">
            <el-option label="在校" value="1"></el-option>
            <el-option label="离校" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="adduserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'Info',
  data () {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.password2 !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateAddPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.addForm.password2 !== '') {
          this.$refs.ruleForm2.validateField('password2')
        }
        callback()
      }
    }
    var validateAddPass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tableData: [], // 列表数据
      dialogFormVisible: false, // 修改数据弹出框
      rules: { // 表单验证规则
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码名称', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入密码名称', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机名称', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱名称', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ]
      },
      form: { // 修改后的数据
        id: '',
        username: '',
        password: '',
        password2: '',
        mobile: '',
        gender: '',
        email: '',
        status: ''
      },
      formLabelWidth: '120px', // 表单宽度
      dialogFormVisible2: false,
      addForm: {
        username: '',
        password: '',
        password2: '',
        mobile: '',
        gender: '',
        email: '',
        status: ''
      },
      rulesAdd: { // 表单验证规则
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码名称', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validateAddPass, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入密码名称', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validateAddPass2, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机名称', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱名称', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ]
      },
      currentPage: 1, // 当前页码
      pageSize: 5,
      total: 0, // 总页码
      search: ''
    }
  },
  watch: {
    search: async function (val, oldVal) {
      if (val.length < oldVal.length) {
        await this.getTableData()
      }
      this.tableData = this.tableData.filter(item => (~item.username.indexOf(val)))
      this.currentPage = 1
      this.total = this.tableData.length
    }
  },
  methods: {
    // 获取全部数据
    async getTableData () {
      const tableData = await this.axios.post('/users')
      // console.log(tableData)
      this.tableData = tableData !== undefined && tableData.data.datas
      this.total = tableData !== undefined && tableData.data.datas.length
    },
    // 点击修改弹出框
    handleEdit (index, row) {
      console.log(index, row)
      const { id, username, password, mobile, gender, email, status } = row
      this.form = {
        id,
        username,
        password,
        mobile,
        gender,
        email,
        status
      }
      this.dialogFormVisible = true
    },
    // 点击删除
    handleDelete (index, row) {
      console.log(index, row)
      this.deleteData(row.id)
    },
    // dialog点击修改
    handleSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.editData()
        } else {
          this.$message.error('正则验证失败，表单信息格式不符合规范，请检查后重新输入!!!')
          return false
        }
      })
    },
    // 修改方法
    editData () {
      this.$confirm('此操作将永久修改该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await this.axios.post('/user/edit', this.qs.stringify(this.form))
        if (result.data.code === 200) {
          this.$message({
            type: 'success',
            message: result.data.msg
          })
          this.getTableData()
        } else {
          this.$message.error(result.data.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    // 删除方法
    deleteData (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await this.axios.post('/user/del', this.qs.stringify({ id }))
        if (result.data.code === 200) {
          this.$message({
            message: result.data.msg,
            type: 'success'
          })
          this.getTableData()
        } else {
          this.$message.error(result.data.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加用户
    adduser () {
      this.dialogFormVisible2 = true
    },
    adduserSubmit () {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.dialogFormVisible2 = false
          this.addData()
        } else {
          this.$message.error('正则验证失败，表单信息格式不符合规范，请检查后重新输入!!!')
          return false
        }
      })
    },
    async addData () {
      const result = await this.axios.post('/user/add', this.qs.stringify(this.addForm))
      console.log(result)
      if (result.data.code === 200) {
        this.$message({
          type: 'success',
          message: result.data.msg
        })
        this.getTableData()
      } else {
        this.$message.error(result.data.msg)
      }
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    }
  },
  created () {
    this.getTableData()
  }
}
</script>

<style lang="less">
.el-table{
  width: 100%;
  .el-table__header-wrapper table,.el-table__body-wrapper table{
    width: 100% !important;
  }
  .el-table__body, .el-table__footer, .el-table__header{
    table-layout: auto;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.el-breadcrumb{
  display: inline-block;
}

.el-pagination{
  margin: 15px;
  text-align: center;
}
.search{
  margin-top: -20px;
}
</style>
