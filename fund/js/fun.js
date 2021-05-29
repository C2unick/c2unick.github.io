initData();

function initData() {
	let i = 0;
	fundinfos.forEach(item => {

		let url =
			"https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=50&plat=Android&appType=ttjj&product=EFund&Version=1&deviceid=e0af23fc-4bea-472e-8312-6d7e93e36829&Fcodes=" +
			item.code;
		/*
		{"FCODE":"000001",
		"SHORTNAME":"华夏成长混合",
		"PDATE":"2021-05-28",
		"NAV":"1.4440",
		"ACCNAV":"3.955",
		"NAVCHGRT":"-1.10",
		"GSZ":"1.446",
		"GSZZL":"-0.96",
		"GZTIME":"2021-05-28 15:00",
		"NEWPRICE":"--",
		"CHANGERATIO":"--",
		"ZJL":"--",
		"HQDATE":"--",
		"ISHAVEREDPACKET":false}
		*/

		axios.get(url).then((resp) => {
			let result = resp.data;

			item.SHORTNAME = result["Datas"][0]["SHORTNAME"];
			item.PDATE = result["Datas"][0]["PDATE"];
			item.NAV = new BigNumber(result["Datas"][0]["NAV"]);
			item.ACCNAV = new BigNumber(result["Datas"][0]["ACCNAV"]);
			item.NAVCHGRT = new BigNumber(result["Datas"][0]["NAVCHGRT"]);
			item.GSZ = new BigNumber(result["Datas"][0]["GSZ"]);
			item.GSZZL = new BigNumber(result["Datas"][0]["GSZZL"]);
			item.GZTIME = result["Datas"][0]["GZTIME"];

			i++;
			if (i == fundinfos.length) {
				writeTable();
			}

		}).catch((err) => {
			console.error(item.name + " | " + url + " 请求失败")
			console.error(err);
		})
	});
}

function writeTable() {
	layui.use('table', function() {
		var table = layui.table;
		table.render({
			elem: '#fundtable',
			data: fundinfos,
			cellMinWidth: 80,
			cols: [
				[{
						field: 'SHORTNAME',
						title: '基金',
						width: 160,
						fixed: true
					},
					{
						field: 'NAVCHGRT',
						title: '净值',
						templet: function(item) {
							let style;
							if (item.NAVCHGRT.gt(0)) {
								style = "style='color: red;'";
							} else {
								style = "style='color: green;'";;
							}
							return "<spen " + style + ">" + item.NAVCHGRT + "%</spen>";
						}
					}, 
					{
						field: 'GSZZL',
						title: '估值',
						templet: function(item) {
							let style;
							if (item.GSZZL.gt(0)) {
								style = "style='color: red;'";
							} else {
								style = "style='color: green;'";;
							}
							
							return "<spen " + style + ">" + item.GSZZL + "%"+ "</br><small>" + item.PDATE +
								"</small></spen>";;
						}
					},{
						field: 'NAVCHGRT',
						title: '当日收益',
						templet: function(item) {
							let style;
							if (item.NAVCHGRT.gt(0)) {
								style = "style='color: red;'";
							} else {
								style = "style='color: green;'";;
							}
							return "<spen " + style + ">" + item.NAVCHGRT + "%</spen>";
						}
					}, 
					{
						field: 'NAVCHGRT',
						title: '持有收益',
						templet: function(item) {
							let style;
							if (item.NAVCHGRT.gt(0)) {
								style = "style='color: red;'";
							} else {
								style = "style='color: green;'";;
							}
							return "<spen " + style + ">" + item.NAVCHGRT + "%</spen>";
						}
					}, 

				]
			]
		});
	});
}
