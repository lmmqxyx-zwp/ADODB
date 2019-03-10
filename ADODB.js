


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

// 获取结果集
function getRecordset() {
	return new ActiveXObject("ADODB.Recordset");
}

// 获取数据库中所有的表的名称
function getTableNames(conn) {
	var tableNames = [];
	try {
		var sql = 'show tables';
		var rs   = getRecordset();
		rs.open(sql,conn);

		var rsSize = 0;

		if (!rs.eof) {
			rsSize = rs.Fields.count;
		}

		while (!rs.eof) {
			// 解析查询结果
			for(var i = 0; i < rsSize; i++) {
				tableNames.push(rs.Fields(i).Value)
			}

			rs.moveNext();
		}
		closeRecordset(rs);
		closeConnection(conn);
	} catch(e) {
		console.log(e.message);
	} finally {

	}

	return tableNames;
}

// 获取查询结果
function query(conn, sql) {
	var data;
	try {
		var rs   = getRecordset();
		rs.open(sql,conn);

		// var rsSize = 0;

		// if (!rs.eof) {
		// 	rsSize = rs.Fields.count;
		// }

		// while (!rs.eof) {
		// 	// 解析查询结果
		// 	for(var i = 0; i < rsSize; i++) {
		// 		console.log(rs.Fields(i).Name + ' => ' + rs.Fields(i).Value);
		// 	}

		// 	rs.moveNext();
		// }

		data = parseRes(rs);

		closeRecordset(rs);
		closeConnection(conn);
	} catch(e) {
		console.log(e.message);
	} finally {

	}

	return data;
}

// 解析结果集
function parseRes(rs) {
	var data = [];
	data.datas = {};
	data.datas.records=[];
	var first = true;
	var index=1;
	while (!rs.eof) {
		if (first) {
			var heads = [{h_name:"#"}];
			for ( var i = 0, len = rs.Fields.count; i < len; i++) {
				heads.push({
					h_name : rs.Fields(i).Name
				});
			}
			first = false;
			data["heads"] = heads;
		}
		var records = {field:[{h_head:"#",d_value:index}]};
		for ( var v = 0, v_len = rs.Fields.count; v < v_len; v++) {
			// datas:[{records:[]}]
			// {d_head:"",d_value:""}
			var record={};
			record["h_head"] = rs.Fields(v).Name;
			record["d_value"] = rs.Fields(v).Value;
			records.field.push(record);
		}
		data.datas.records.push(records);
		// ....
		rs.moveNext();
		
		index++;
	}
	return data;
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