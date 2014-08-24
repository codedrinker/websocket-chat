var wsp;//websocket 通信object

var autoBind = true;//配置true是自动执行绑定,如果是false需要手动设置,这个看自己的情况确定

var openLog = true;

var autoPolling = true;


var SinaWeiboUser = "s"
var VKUser = "v"
var LinkedInUser = "k"
var FacebookUser = "f"
var TwitterUser = "t"
var GooglePlus = "g"
var InstagramUser = "i"
var MobileUser = "m"
var TencentWeiboUser = "q"


var chatBatch = false;//开启批量发送对话表示

var language;

var version;

var isInitButtons = false; //初始化按钮

var isInitStatus = false;