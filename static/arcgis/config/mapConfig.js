define(["require", "exports"], function (require, exports) {
    "use strict";
    var opt = {
        mapServerUrl: 'http://10.40.0.125:6080',
        layerList: [
            { name: '行政区', "opacity": 0.8 },
            { name: '核心区', visible: false, "opacity": 0.6 },
            { name: '建设用地管制分区图', visible: false },
            { name: '土地利用现状图', visible: false },
            { name: '基本农田保护规划图', visible: false },
            { name: '影像图' }
        ]
    };
    var configs = {
        extent: { xmin: 38419943.3673, ymin: 2549685.4310999997, xmax: 38441661.804900005, ymax: 2557634.473099999 },
        lods: [
            { "level": 0, "resolution": 76.43717985352637, "scale": 288895.85 },
            { "level": 1, "resolution": 38.2185912496825, "scale": 144447.93 },
            { "level": 2, "resolution": 19.10929430192194, "scale": 72223.96 },
            { "level": 3, "resolution": 9.55464715096097, "scale": 36111.98 },
            { "level": 4, "resolution": 4.777323575480485, "scale": 18055.99 },
            { "level": 5, "resolution": 2.3886631106595546, "scale": 9028 },
            { "level": 6, "resolution": 1.1943315553297773, "scale": 4514 },
            { "level": 7, "resolution": 0.5971657776648887, "scale": 2257 },
            { "level": 8, "resolution": 0.2985828888324443, "scale": 1128.5 },
            { "level": 9, "resolution": 0.14929144441622216, "scale": 564.25 }
        ],
        layers: {
            企业活跃度: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/企业活跃度/MapServer',
                text: '企业活跃度',
                sublayerIds: { 'nb': '年报企业', 'hy': '活跃企业' }
            },
            市场经营秩序: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/市场经营秩序/MapServer',
                text: '市场经营秩序',
                sublayerIds: { 'xzcf': '行政处罚', 'tsjb': '投诉举报', 'ycjy': '经营异常' }
            },
            重点产业: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/重点企业产业分布/MapServer',
                text: '重点产业'
            },
            市场主体: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/市场主体企业分布/MapServer',
                text: '市场主体',
                sublayerIds: { 'zy': '在营', 'zx': '注销' }
            },
            迁移企业: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/迁移企业分布/MapServer',
                text: '迁移企业',
                sublayerIds: { 'qr': '迁入', 'qc': '迁出' }
            },
            楼宇经济: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/楼宇经济企业分布/MapServer',
                text: '楼宇经济',
                sublayerIds: { 'fhq': '孵化器', 'yq': '园区', 'xzl': '写字楼' }
            },
            行政区: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/行政区/MapServer',
                text: '行政区划',
                sublayerIds: { 'street': '街镇' }
            },
            核心区: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/核心区/MapServer',
                text: '核心区'
            },
            影像图: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/海珠区影像图/MapServer',
                text: '影像图'
            },
            土地利用现状图: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/土地利用现状图/MapServer',
                text: '土地利用现状图'
            },
            基本农田保护规划图: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/基本农田保护规划图/MapServer',
                text: '基本农田保护规划图'
            },
            建设用地管制分区图: {
                url: opt.mapServerUrl + '/arcgis/rest/services/海珠大数据/建设用地管制分区图/MapServer',
                text: '建设用地管制分区图'
            }
        },
        gp: {
            GeometryServer: opt.mapServerUrl + '/arcgis/rest/services/Utilities/Geometry/GeometryServer',
            PrintingTools: opt.mapServerUrl + '/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task'
        },
        other: {
            heatmapColorRamp: ["rgba(000,000,255,0)", "rgba(000,000,200,0.6)", "rgb(000,255,255)", "rgb(000,255,000)", "rgb(255,255,000)", "rgb(255,102,0)", "rgb(255,000,000)"]
        },
        pageInfos: {
            timeSliderMap: {
                loadLayers: [
                    { name: '重点产业' }
                ].concat(opt.layerList),
            },
            marketBodyMap: {
                loadLayers: [
                    { name: '市场主体' },
                ].concat(opt.layerList),
                keylayerName: '市场主体'
            },
            companyMoving: {
                loadLayers: [
                    { name: '迁移企业' },
                ].concat(opt.layerList),
                keylayerName: '迁移企业'
            },
            buildingEco: {
                loadLayers: [
                    { name: '楼宇经济' },
                ].concat(opt.layerList),
                keylayerName: '楼宇经济'
            },
            activeCompany: {
                loadLayers: [
                    { name: '企业活跃度' },
                ].concat(opt.layerList),
                keylayerName: '企业活跃度'
            },
            marketManagement: {
                loadLayers: [
                    { name: '市场经营秩序' },
                ].concat(opt.layerList),
                keylayerName: '市场经营秩序'
            }
        }
    };
    return configs;
});
