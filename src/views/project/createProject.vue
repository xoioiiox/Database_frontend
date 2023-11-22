<template>
		<div>
			<div>
				<homeHeader></homeHeader>
			</div>
			<div class="content">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="活动名称">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="活动地点">
						<el-input v-model="form.position"></el-input>
					</el-form-item>
					<el-form-item label="活动时间">
						<el-col :span="6">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
						</el-col>
						<el-col class="line" :span="1">
							<div class="center">-</div>
						</el-col>
						<el-col :span="4">
							<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="发布范围" prop="range">
						<el-select v-model="form.range" placeholder="请选择">
							<el-option
								v-for="item in ranges"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>  
					</el-form-item>
					<el-form-item label="活动描述">
						<el-input type="textarea" v-model="form.description"></el-input>
					</el-form-item>
					<el-form-item label="活动标签">
							<el-tag
									:key="tag"
									v-for="tag in dynamicTags"
									closable
									:disable-transitions="false"
									@close="handleClose(tag)">
									{{tag}}
							</el-tag>
							<!--enter键绑定-->
							<el-input
									class="input-new-tag"
									v-if="inputVisible"
									v-model="inputValue"
									ref="saveTagInput"
									size="small"
									@keyup.enter.native="handleInputConfirm"
									@blur="handleInputConfirm">
							</el-input>
						<el-button v-else class="button-new-tag" size="small" @click="showInput">+Tag</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">立即创建</el-button>
						<el-button @click="back">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
</template>

<script>
	import homeHeader from "@/components/homeHeader";
		export default {
			components: {homeHeader},
			/*async created() {
				this.axios({
					methods: 'get',
					url: '',
				}).then((res)=>{
					this.ranges = res.data.ranges;
				})
			},*/
			data() {
				return {
					form: {
						name: '',
						position: '',
						date1: '',
						date2: '',
						description: '',
						range: ''
					},
					ranges:[
						{value: '0', label: '全体'},
						{value: '1', label: 'xx志愿团体'}
					],
					dynamicTags: [],
					inputVisible: false,
					inputValue: ''
				};
			},
			methods: {
				onSubmit() {
					let data = {
						team_id: this.team_id,
						name: this.form.name,
						position: this.form.position,
						date1: this.form.date1,
						date2: this.form.date2,
						description: this.form.description
					}
					console.log(data);
					this.axios({
						methods: 'post',
						url: '/create_project/',
						data: data
					}).then((res) => {
						console.log(res.data);
						if (res.data.value === 200) { //后端传回数据
							let msg = this.$message({
								type: 'success',
								message: "项目创建成功"
							});
							setTimeout(()=> {
								msg.close();
							},1000);
							this.$router.push({
								path: '/home'
							})
						} else {
							this.$message({
								type: 'error',
								message: "error!"
							});
						}
					})
				},

				handleClose(tag) {
					this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
				},
	
				showInput() {
					this.inputVisible = true;
					// eslint-disable-next-line
					this.$nextTick(_ => {
						this.$refs.saveTagInput.$refs.input.focus();
					});
				},
	
				handleInputConfirm() {
					let inputValue = this.inputValue;
					if (inputValue) {
						this.dynamicTags.push(inputValue);
					}
					this.inputVisible = false;
					this.inputValue = '';
				},

				back() {
					this.$router.push({
						path: '/home'
					})
				}
			}
		}
	</script>

<style>
	.content {
		margin-left: 120px;
		margin-right: 500px;
		margin-top: 20px;
	}
	.center {
			text-align: center;
	}
	.el-tag + .el-tag {
			margin-left: 10px;
	}
	.button-new-tag {
			margin-left: 10px;
			height: 32px;
			line-height: 30px;
			padding-top: 0;
			padding-bottom: 0;
	}
	.input-new-tag {
			width: 90px;
			margin-left: 10px;
			vertical-align: bottom;
	}
</style>