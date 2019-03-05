


/**
 * 获取MYSQL数据库连接
 *
 * @param cs 获取数据库连接的字符串
 * @return 数据库连接
 */
function getConnection(cs) {
	var conn = new ActiveXObject("ADODB.Connection");
	conn.open(cs);

	return conn;
}

// 获取查询结果
function query(conn, sql) {
	var rs   = new ActiveXObject("ADODB.Recordset");
	rs.open(sql,conn);
}

// 关闭数据库连接
function closeConnection(conn) {
	if (conn != undefined) {
		conn.close();
	}
}

// 关闭结果集
function closeRecordset(rs) {
	if (rs != undefined) {
		rs.close();
	}
}

// 执行SQL
function execute(conn, sql) {

}

// <script>
// 	var conn = new ActiveXObject("ADODB.Connection");
// 	var rs   = new ActiveXObject("ADODB.Recordset");
// 	try{
// 		// debugger;
// 		var connectionstring = "Driver={MySQL ODBC 5.1 Driver};Server=192.168.0.245;Database=file;User=oppox905; Password=oppox905;Option=3;Port=3306";
// 		conn.open(connectionstring);
// 		var sql = "SELECT * FROM `file`.`t_china` limit 0,1000";
// 		rs.open(sql,conn);
// 		var fieldsCount = 0;
// 		if(!rs.eof) {
// 			// 1.获取字段的数量
// 			fieldsCount = rs.Fields.count;
// 		}
// 		while(!rs.eof){
// 			// 解析查询结果
// 			for(var i = 0; i < fieldsCount; i++) {
// 				console.log(rs.Fields(i).Name + ' => ' + rs.Fields(i).Value);
// 			}
// 			rs.moveNext();
// 		}
// 		rs.close();
// 		conn.close();
// 	} catch(e){
// 		console.log(e.message);
// 	} finally{
		
// 	}
// </script>