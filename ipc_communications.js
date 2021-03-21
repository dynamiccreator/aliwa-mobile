module.exports = function () {
   const aliwa= require("./logic/wallet");      
   const {ipcMain, Notification} =require ("electron");
   const path = require('path');
   
   var wallet=null;
   
   
   
   //STARTUP************************************************************
    function syncing_loop(time){
        setTimeout(async function(){
            if(wallet!=null && wallet!=undefined){
                await wallet.sync();         
            }
            
            if(wallet!=null && wallet!=undefined && wallet.sync_shift>0){
                syncing_loop(time+wallet.sync_shift);
                wallet.sync_shift=0;
            }
            else{syncing_loop(time);}           
        },time);     
   }
   
    syncing_loop(30000);
        
   ipcMain.handle('open_wallet', async (event) => {
    var wal = new aliwa.aliwa_wallet();
    var data = wal.read_wallet_DB();
    if (data == false) {return false;}
    else{ return true;}
   });
   
   ipcMain.handle('create_wallet', async (event, seed_words,seed_pw,wallet_pw) => {
    if(wallet!=null){
        wallet.disconnect();
        delete wallet;
        wallet=null;
    }   
    var wal = new aliwa.aliwa_wallet();
    await wal.create_wallet(seed_words,seed_pw,wallet_pw);
    //inital update for address gen
    await wal.db_wallet.update_addressbook_receive(-1);
    await wal.save_wallet(null);
    var data = wal.read_wallet_DB();
    if (data == false) {return false;}
    else{ return true;}
   });
   
   //SEED*****************************************************************
   ipcMain.handle('get_wallet_seed', async (event) => {
       var seed=wallet.get_wallet_seed();
       return seed;
   });
   
   ipcMain.handle('get_new_seed', async (event) => {
       var wal = new aliwa.aliwa_wallet();
       var seed=wal.wallet_functions.get_new_seed_words();
       return seed;
   });
   
   //SETTINGS*************************************************************
   ipcMain.handle('get_new_seed_words', async (event) => {
    var wal = new aliwa.aliwa_wallet();
    return await wal.wallet_functions.get_new_seed_words();   
   });
   
    ipcMain.handle('set_password', async (event,pw) => {
        return await wallet.set_wallet_pw(pw);       
   });
   
   ipcMain.handle('compare_password', async (event,pw) => {
        return await wallet.compare_pw(pw);       
   });
   
   //OVERVIEW*************************************************************  
   ipcMain.handle('load_wallet', async (event,pw) => {
    wallet = new aliwa.aliwa_wallet();
    var data = wallet.read_wallet_DB();
    var can_load_db = await wallet.load_wallet_DB(data, pw);   
    if (can_load_db === true) {
        await wallet.connect_to_server(); 
        setTimeout(function(){wallet.sync();},1500);           
    return true;}
    else{ return false;}
   });
     
   ipcMain.handle('get_sync_state', async (event) => {
        return wallet.sync_state;
   });
   
  ipcMain.handle('gui_was_updated', async (event) => {      
    return wallet.gui_was_updated;
   });
   
   ipcMain.handle('set_gui_updated', async (event) => {      
     wallet.gui_was_updated=true;
   }); 
   
   ipcMain.handle('get_balance', async (event) => {     
        var balance=await wallet.get_balance();
        return balance;   
   });
   
   //RECEIVE*****************************************************************
       ipcMain.handle('get_latest_receive_addr', async (event) => {             
        return wallet.get_highest_unused_receive_address();
   });
   
     ipcMain.handle('change_receive_address_label', async (event,pos,label) => {             
        return wallet.change_receive_address_label(pos,label);
   });
   
    ipcMain.handle('save_wallet', async (event,path) => {             
        return wallet.save_wallet(path);
   });
   
   
   //SENDING***************************************************************** 
    ipcMain.handle('send', async (event,tx_info) => {             
        console.log("before_sending: ",tx_info);
        wallet.send_transaction(tx_info.hex,tx_info.tx_object);
   });
   
   ipcMain.handle('get_fee', async (event,destinations) => {
        var tx_build= await wallet.create_transaction(destinations);
        if(tx_build!=false){
        return tx_build.fee;}
        else{return false;}
   });
   
   ipcMain.handle('get_raw_tx', async (event,destinations) => {
        var tx_build= await wallet.create_transaction(destinations);
        if(tx_build!=false){
        return tx_build;}
        else{return false;}
   });
   
   //ADDRESSBOOK*************************************************************
   
   
   ipcMain.handle('list_receive_addresses', async (event,page, order_field, direction) => {
        var list_result= wallet.list_receive_addresses(page, order_field, direction);
        return list_result;
   });
   
   
  
  //TRANSACTIONS VIEW********************************************************
  
    ipcMain.handle('list_transactions', async (event,page, order_field, direction) => {
        var list_result= wallet.list_transactions(page, order_field, direction);
        return list_result;
   });
   
    ipcMain.handle('get_single_transaction', async (event,tx) => {
        var list_result= wallet.get_single_transaction(tx);
        return list_result;
   });
   
   //open in browser
   ipcMain.handle('open_tx_link', async (event,link) => {
        require("electron").shell.openExternal(link);
   });
   
   
   
    
   
   
   
   
   
   
 /* ipcMain.handle('test', async (event, someArgument) => {
  console.log(event);
  console.log(someArgument);
  console.log("test to the main!");
  
  if(Notification.isSupported()){
       await  new Notification({
        icon: path.join(__dirname,'/view_resources/img/aliwa_light.png'),
        title:"ALIAS RECEIVED",
        body: '20.25 received'
      }).show();
  }
   // require("electron").shell.openExternal("https://chainz.cryptoid.info/alias/");
  return "give back";

//myNotification.onclick = () => {
//  console.log('Notification clicked')
//}
  
});*/
};