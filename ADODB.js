


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