import React,{ReactDOM} from 'react'
import TronWeb from '../../src/index'
import stringify from 'json-stringify-pretty-compact'
import {utils} from 'ethers'
//let tronWeb = new TronWeb('http://52.44.75.99:8090');
//tronWeb.setEventServer('http://52.44.75.99:18889');
//tronWeb.defaultAccount = 'TPL66VK2gCXNCD7EJg9pgJRfqcRazjhUZY';
//tronWeb.defaultPk='da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';
let tronWeb = new TronWeb('http://testapi.trondapps.org');
tronWeb.setEventServer('http://testevent.trondapps.org');
tronWeb.defaultAccount = 'TWsm8HtU2A5eEzoT8ev8yaoFjHsXLLrckb';
tronWeb.defaultPk='8ef7dd1a81d4ef2b538daae0c20e37f4edb3fd1338aff91b03e2b8b1ed956645';
class Index extends React.Component{
    state = {
        resource:'BANDWIDTH',
        data:{}
    }
    componentDidMount(){
        let coder = new utils.AbiCoder();
        window.tronWeb = tronWeb;
    }
    triggerChromeWallet(){
        const res = tronWeb.sendTransactionByWallet({to:'TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5',amount:0.1},function(result){
            console.log('cbk',result);
        })
        this.setState({
            data:res
        })
    }

    async toBigNumber(){
        let str = '200000000000000000000001';
        let bigNumber = tronWeb.toBigNumber(str);
        console.log(bigNumber.toNumber(),'2.0000000000000002e+23')
        let value = bigNumber.toString(10);
        this.setState({
            data:value
        })

    }
    async getBalance(){
        const res = await tronWeb.getBalance(this.account.value);
        this.setState({
            data:res
        })
    }
    async getBlock(){
        const res = await tronWeb.getBlock(this.idOrHeight.value);
        this.setState({
            data:res
        })
    } 
    async getBlockTransactionCount(){
        const res = await tronWeb.getBlockTransactionCount(this.idOrHeight.value);
        this.setState({
            data:res
        })
    } 
    async getTransaction(){
        const res = await tronWeb.getTransaction(this.transactionId.value);
        this.setState({
            data:res
        })
    }
    //生成私钥和地址并存储到localStorage中
    //该api有泄漏private key的风险，请确保在安全的环境中调用该api
    async generateAddress(){
        const res = await tronWeb.generateAddressOnLine();
        this.setState({
            data:res
        })
    }
    async generateAddressOnClient(){
        const res = await tronWeb.generateAddressOnClient();
        this.setState({
            data:res
        })
    }
    //通过密码创建地址
    async createAddressWithPassWord(){
        const res = await tronWeb.createAddress('123456');
        console.log(res);//{base58checkAddress: "TMip2NnRKhy2Wyf1FjKG1D1yn3F1LLGCDV",value:""4180e8816651790d4d6c187eef09f90b7a19408bb8"
    }
    //转账
    async sendTransaction(e){
        e.preventDefault();
        const from = this.from.value;
        const to = this.to.value;
        const amount =parseInt(this.amount.value);
        const pk = this.pkForTransaction.value;
        const res = await tronWeb.sendTransaction(from,to,amount,pk);
        this.setState({
           data:res
        })
    }
    //1、更新账户名称
    async updateAccount(){
        const res = await tronWeb.updateAccount('wujiaolong1009','TT67rPNwgmpeimvHUMVzFfKsjL9GZ1wGw8');
        this.setState({
            data:res
        })
    }
    //2、Vote for the superrepresentative
    async voteWitnessAccount(){
        const res = await tronWeb.voteWitnessAccount('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',[{
            vote_address:'TQxyQu5d76MaxsEF4nBf9tFa8s93nSHe8M',
            vote_count:1
        }]);
        this.setState({
            data:res
        })
    }
    //3、发行token
    async createAssetIssue(){
        let options = {
            owner_address:'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
            name:'TestTRX',//名称
            abbr:'TTRX',//简称
            total_supply :100,//发行总量
            trx_num:1,// 和 num 的兑换比例
            num:1,
            start_time : 1530894315158,//开始时间
            end_time:1533894312158,//结束时间
            description:'这是一个测试token',//描述
            url:'http://www.baidu.com',//官网地址
            free_asset_net_limit:10000,//免费带宽
            public_free_asset_net_limit:10000,// 每个token用户能使用本token的免费带宽
            frozen_supply:{
                frozen_amount:1,//发行者在发行的时候指定冻结的token
                frozen_days:2 //冻结的天数
            }
        }
        const res = await tronWeb.createToken(options)
        this.setState({
            data:res
        })
    }
    //5、 Apply to be a superrepresentative
    async createWitness(){
        const res = await tronWeb.createWitness('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9','http://www.xxx.com');
        this.setState({
            data:res
        })
    }
    //6、 Transfer token
    async transferAsset(){
        const res = await tronWeb.transferAsset({
            owner_address:'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
            to_address:'TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL',
            asset_name:'ZZZ',
            amount:1
        });
        this.setState({
            data:res
        })
    }
    //7、 Participation in token distribution
    async participateAssetIssue(){
        const res = await tronWeb.transferAsset({
            owner_address:'TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9',
            to_address:'TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL',
            asset_name:'ZZZ',
            amount:1
        });
        this.setState({
            data:res
        })
    }
    // 
    async freezeBalance(){
        const frozen_balance = Number(this.frozen_balance.value);
        const resource = this.state.resource;
        let res = await tronWeb.freezeBalance(tronWeb.defaultAccount,frozen_balance,3,resource);
        this.setState({
            data:res
        })    
    }
    //8、 解冻已经技术冻结期的 TRX
    async unfreezeBalance(){
        let res = await tronWeb.unfreezeBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');
        this.setState({
            data:res
        })
    }
    //9、解冻已经结束冻结期的 token
    async unfreezeAsset(){
        let res = await tronWeb.unfreezeAsset('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');
        this.setState({
            data:res
        })
    }
    //10、超级代表提现奖励到balance,每24小时可提现一次
    async withdrawBalance(){
        let res = await tronWeb.withdrawBalance('TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9');
        this.setState({
            data:res
        })
    }
    //11、修改token信息
    async updateAsset(){
        const res = await tronWeb.updateAsset({
            owner_address:"TBp39yWZhFEG5NdAoFFxepaj2dxCQjNmB9",
            description: 'test',
            url: 'http://www.baidu.com',
            new_limit : 1000000,
            new_public_limit : 100
        });
        this.setState({
            data:res
        })
    }
    //12、查询api所在机器连接的节点
    async listNodes(){
        let res = await tronWeb.listNodes();
        this.setState({
            data:res
        })
    }
    //13、查询账户发行的token
    async getAssetIssueByAccount(){
        let res = await tronWeb.getAssetIssueByAccount('TRzzMbFDNdFnRgGqKCkqoCuLoHfyRZfuVL');
        this.setState({
            data:res
        })
    }
    //14、根据名称查询token
    async getAssetIssueByName(){
        let res = await tronWeb.getAssetIssueByName('ZZZ');
        this.setState({
            data:res
        })
    }
    //15、查询最新块
    async blockNumber(){
        let res = await tronWeb.blockNumber();
        this.setState({
            data:res
        })
    }
    //16、通过高度查询块
    async getBlockByNum(){
        let res = await tronWeb.getBlockByNum(869015);
        this.setState({
            data:res
        })
    }
    //17、通过id查询块
    async getBlockById(){
        let res = await tronWeb.getBlockById('00000000000d429759175a43cb3e112d0761ecabf06ef0c253affe1420977651');
        this.setState({
            data:res
        })
    }
    //18、按照范围查询块
    async getBlockByLimitNext(){
        let res = await tronWeb.getBlockByLimitNext(869010,869015);
        this.setState({
            data:res
        })
    }
    //19、﻿查询最新的几个块
    async getBlockByLatestNum(){
        let res = await tronWeb.getBlockByLatestNum(5);
        this.setState({
            data:res
        })
    }

    //20、通过ID查询交易
    async getTransactionById(){
        let res = await tronWeb.getTransactionById('0689352aff84a0ff3691502bca94b1ded40abb4aa8806b313acb59a34cf10c22')
        this.setState({
            data:res
        })
    }
    //21、查询所有超级代表列表
    async listWitNesses(){
        let res = await tronWeb.listWitNesses();
        this.setState({
            data:res
        })
    }
    //22、查询所有token列表
    async getAssetIssueList(){
        let res = await tronWeb.getAssetIssueList();
        this.setState({
            data:res
        })
    }
    //23、分页查询token列表
    async getPaginateDassetIssueList(){
        let res = await tronWeb.getPaginateDassetIssueList(1,10);
        this.setState({
            data:res
        })
    }
    //24、统计所有交易总数
    async totalTransaction(){
        let res = await tronWeb.getTransactionCount();
        this.setState({
            data:res
        })
    }
    //25、获取下次统计投票时间
    async getNextMaintenanceTime(){
        let res = await tronWeb.getNextMainteNanceTime();
        this.setState({
            data:res
        })
    }
    //26、检查地址是否正确
    async validateAddress(){
        let res = await tronWeb.validateAddress('TZ3SmkD8qJK3VY8AnqN9XFiYuspEP3cwB5');
        this.setState({
            data:res
        })
    }
    //27、部署合约
    async deployContract(event){
        event.preventDefault();
        let myContract = tronWeb.contract(JSON.parse(this.abi.value));
        //部署合约
        let contractInstance = await myContract.new({
            from:this.owner_address.value,
            data:this.byteCode.value,
            fee_limit:this.fee_limit.value,
            call_value:this.call_value.value,
            consume_user_resource_percent:this.consume_user_resource_percent.value
        },this.pk.value)
        this.setState({
            data:contractInstance
        })
    }
    //28、查询合约
    async getContract(){
        let res = await tronWeb.getContract(this.contract_address.value);
        this.setState({
            data:res
        })
    }
    //29、调用合约
    async triggerContract(){
        let abi = [{"constant":false,"inputs":[{"name":"number","type":"uint256"}],"name":"fibonacciNotify","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"number","type":"uint256"}],"name":"fibonacci","outputs":[{"name":"result","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"input","type":"uint256"},{"indexed":false,"name":"result","type":"uint256"}],"name":"Notify","type":"event"}];
        let myContract = tronWeb.contract(abi);
        let contractAddress = '416061e95f6e362efc3170fd50ac22197d9119b09e';
        let contractInstance = await myContract.at(contractAddress);
        let { transaction,result,constant_result } = await contractInstance.fibonacciNotify(7,{
            fee_limit:7000000,
            call_value:0
        });
        if(!constant_result){
            let res = await contractInstance.fibonacciNotify.sendTransaction(transaction,this.pk.value);
            this.setState({
                data:res
            })
            //监听事件
            let myEvent = await contractInstance.Notify();//默认根据合约地址查询，可以输入{eventName:'',blockNum:'',transactionId:''}
             myEvent.watch(function(err,result){
                 let eventResult = '';
                 result.forEach((item)=>{
                     if(item.transaction_id ==transaction.txID){
                         eventResult = item.result;
                         myEvent.stopWatching();
                     }
                 })
                 console.log('eventResult:',eventResult);
             });
           // console.log(eventResult)

        }

    }

    //30、login
    login(){
        let account = tronWeb.login(tronWeb.defaultPk);
        this.setState({
            data:account
        })
    }

    render(){
        const { data } = this.state;
        return (
            <div>
                <div className="box" style={{marginTop:'200px'}}>
                    <h3>工具函数 - Tool function</h3>
                    <div>
                        <input type="button" value="to BigNumber" onClick={()=>this.toBigNumber()}/>
                    </div>
                    <h3>账号、转账 - Account number, transfer</h3>
                    <div>
                        账号 - account number：<input type="text" style={{width:'300px'}} ref={(input)=>this.account =input} defaultValue={tronWeb.defaultAccount}/>
                        <input type="button" onClick={()=>this.getBalance()} value="查询账户余额 - Check account balance" />
                    </div>
                    <div>
                        <input type="button" value="triggerWallet" onClick={()=>this.triggerChromeWallet()}/>
                    </div>
                    <div>
                        <input type="button" value="生成私钥地址 - Generate private key address(onLine)" onClick={()=>this.generateAddress()}/>
                        <input type="button" value="生成私钥地址 - Generate private key address(onClient)" onClick={()=>this.generateAddressOnClient()}/>
                        <div>
                            <input type="button" value="验证地址 - Verify address" onClick={()=>this.validateAddress()}/>
                        </div>
                        <input type="button" value="通过密码创建地址 - Create an address with a password" onClick={()=>this.createAddressWithPassWord()}/>

                        <input type="button" value="更新账号名称 - Update account name" onClick={()=>this.updateAccount()}/>
                        <hr/>
                        <form>
                            <p><label>from</label><input type="text" style={{width:'300px'}} ref={(input)=>this.from =input} defaultValue={tronWeb.defaultAccount}/> </p>
                            <p><label>to</label><input type="text" style={{width:'300px'}} ref={(input)=>this.to =input} defaultValue={`TGhepyLuyML5n5jQBTykKqh9od8hQrBDkS`}/> </p>
                            <p><label>amount</label><input type="text" ref={(input)=>this.amount =input}  defaultValue={1000000} /> </p>
                            <p><label>pk</label><input type="text"  style={{width:'500px'}}ref={(input)=>this.pkForTransaction =input} defaultValue={tronWeb.defaultPk} /> </p>
                            <input type="button" onClick={(e)=>this.sendTransaction(e)} value="转账 - Transfer" />
                        </form>
                    </div>
                    <h3>节点查询 - Node query</h3>
                    <div>
                        <input type="button" value="查询API所在机器连接的节点 - Query the node to which the machine where the API is connected" onClick={()=>this.listNodes()}/>
                    </div>
                    <h3>块查询 - Block query</h3>
                    <div>
                        块id或高度 - Block id or height：<input type="text" style={{width:'600px'}} ref={(input)=>this.idOrHeight =input} defaultValue='00000000000005ae07f42776b3bfd8e873feaebf2d743aceb716db5f70cb373b' />
                        <input type="button" onClick={()=>this.getBlock()} value="查询区块 - Query block" />
                        <input type="button" onClick={()=>this.getBlockTransactionCount()} value="查询区块内交易数量 - Query the number of transactions in the block" />
                        <input type="button" value="查询最新块 - Query the latest block" onClick={()=>this.blockNumber()}/>
                    </div>
                    <div>
                        {/*<input type="button" value="通过高度范围查询块 - Query block by height range" onClick={()=>this.getBlockByLimitNext()}/>
                        <input type="button" value="查询最近的几个块 - Query the most recent blocks" onClick={()=>this.getBlockByLatestNum()}/>*/}
                    </div>
                    <h3>交易查询 - Transaction inquiry</h3>
                    <div>
                        交易id - Transaction id：<input type="text" style={{width:'600px'}} ref={(input)=>this.transactionId =input} defaultValue='c523edd7b4b776aa44e4cd4bbdf925cb4eb6d047e27316e1ff919014cc6a9f54'/>
                        <input type="button" value="通过id查询交易记录 - Query transaction records by id" onClick={()=>this.getTransaction()}/>
                        <input type="button" value="统计所有的交易总数 - Count all transactions" onClick={()=>this.totalTransaction()}/>
                    </div>
                    <h3>超级代表 - Super Representative (SR)</h3>
                    <div>
                        <input type="button" value="查询所有超级代表 - Query all SR" onClick={()=>this.listWitNesses()}/>
                        <input type="button" value="获取下次统计投票时间 - Get the next maintenance time" onClick={()=>this.getNextMaintenanceTime()}/>
                        <input type="button" value="申请成为超级代表 - Apply to become a SR" onClick={()=>this.createWitness()}/>
                        <input type="button" value="为超级代表投票 - Vote for the SR" onClick={()=>this.voteWitnessAccount()}/>
                        <input type="button" value="解冻结束冻结期的trx - Unfreeze the trx at the end of the freeze period" onClick={()=>this.unfreezeBalance()}/>
                        <input type="button" value="超级代表提现奖励到balance - SR withdraws the reward to balance" onClick={()=>this.withdrawBalance()}/>
                    </div>
                    <h3>token管理 - Token management</h3>
                    <div>
                        <label>BANDWIDTH:<input defaultChecked ref="resource" name="resource" onChange={()=>{this.setState({resource:'BANDWIDTH'})}} type="radio"  /></label><label>ENERGY:<input ref="resource" name="resource" onChange={()=>{this.setState({resource:'ENERGY'})}} type="radio" /></label><input type="text" defaultValue="1000000" ref={input=>this.frozen_balance = input}  /><input type="button" value="冻结获取资源 - freeze gain resource" onClick={()=>this.freezeBalance()}/>
                    </div>
                    <div>
                        <input type="button" value="查询所有token列表 - Query all token lists" onClick={()=>this.getAssetIssueList()}/>
                        <input type="button" value="分页查询token列表 - Paging query token list" onClick={()=>this.getPaginateDassetIssueList()}/>
                        <input type="button" value="查询某账户发行的token - Query the token issued by an account" onClick={()=>this.getAssetIssueByAccount()}/>
                        <input type="button" value="根据名称查询token - Query token by name" onClick={()=>this.getAssetIssueByName()}/>
                        <input type="button" value="发行token - Issue token" onClick={()=>this.createAssetIssue()} style={{color:'red'}}/>
                        <input type="button" value="转账token - Transfer token" onClick={()=>this.transferAsset()}/>
                        <input type="button" value="修改token - Modify token" onClick={()=>this.updateAsset()}/>
                        <input type="button" value="解冻token - Unfreeze the token" onClick={()=>this.unfreezeAsset()} style={{color:'red'}}/>
                        <input type="button" value="参与token发行 - Participate in token issuance" onClick={()=>this.participateAssetIssue()}/>
                    </div>
                    <h3>智能合约 - Smart contract</h3>
                    <div>
                         <div>
                             <form onSubmit={(e)=>this.deployContract(e)}>
                                 <div>
                                     <label>owner_address：</label>
                                     <input type="text" style={{width:'300px'}} ref={(input)=>this.owner_address=input} defaultValue={tronWeb.defaultAccount}/>
                                 </div>
                                 <div>
                                     <label>pk:</label>
                                     <input type="text" style={{width:'500px'}} ref={(input)=>this.pk = input} defaultValue={tronWeb.defaultPk}/>
                                 </div>
                                 <div>
                                     <label>Abi</label><textarea cols="50" rows="10" placeholder="abi" defaultValue='' ref={(input)=>this.abi = input}></textarea>
                                 </div>
                                 <div>
                                     <label>byteCode</label><textarea  cols="50" rows="10" placeholder='byteCode' defaultValue='' ref={(input)=>this.byteCode = input}></textarea>
                                 </div>

                                 <div>
                                     <label >fee_limit：</label>
                                     <input type="text" ref={(input)=>this.fee_limit=input} defaultValue={Math.pow(10,10)}/>
                                 </div>
                                 <div>
                                     <label >call_value：</label>
                                     <input type="text" ref={(input)=>this.call_value=input} defaultValue={0}/>
                                 </div>
                                 <div>
                                     <label >consume_user_resource_percent：</label>
                                     <input type="text" ref={(input)=>this.consume_user_resource_percent=input} defaultValue={0}/>
                                 </div>
                                 <div>
                                     <input type="submit" value="部署合约 - Deploy contract"/>
                                 </div>
                             </form>
                             <hr/>
                         </div>
                        <div>
                            <label >查询合约地址 - Query contract address：</label>
                            <input type="text" style={{width:'300px'}} ref={(input)=>this.contract_address=input} defaultValue={``}/>
                            <input type="button" value="查询合约 - Query contract" onClick={()=>this.getContract()}/>
                        </div>
                        <div>
                            <input type="button" value="调用合约 - Call contract" onClick={()=>{this.triggerContract()}}/>
                        </div>
                        <div>
                            <input type="button" value="登录 - login" onClick={()=>this.login()}/>
                        </div>


                    </div>
                </div>

                <div style={{position:'fixed',left:0,top:0}}>
                    <textarea cols="100" rows="10"  value={stringify(data)} onChange={()=>{}}></textarea>
                </div>
                <style jsx>{`

                    label{
                        display:inline-block;
                        width:150px;
                    }

                `}
                </style>

            </div>

        )
    }
}
export default Index