export const DAY_TIME_PLAN = [
    {
        day: '0',
        dayId: 'recordDiv_monDay',
        title: '星期一',
        value: [3,11 ],
        planId: 'recordDiv_dayTimePlan0'
    },
    {
        day: '1',
        dayId: 'recordDiv_tueDay',
        title: '星期二',
        value: [5,10 ],
        planId: 'recordDiv_dayTimePlan1'
    },
    {
        day: '2',
        dayId: 'recordDiv_wedDay',
        title: '星期三',
        value: [8,16 ],
        planId: 'recordDiv_dayTimePlan2'
    },
    {
        day: '3',
        dayId: 'recordDiv_thuDay',
        title: '星期四',
        value: [4,10 ],
        planId: 'recordDiv_dayTimePlan3'
    },
    {
        day: '4',
        dayId: 'recordDiv_friDay',
        title: '星期五',
        value: [9,13 ],
        planId: 'recordDiv_dayTimePlan4'
    },
    {
        day: '5',
        dayId: 'recordDiv_satDay',
        title: '星期六',
        value: [5,7 ],
        planId: 'recordDiv_dayTimePlan5'
    },
    {
        day: '6',
        dayId: 'recordDiv_sunDay',
        title: '星期天',
        value: [6,18 ],
        planId: 'recordDiv_dayTimePlan6'
    }
]


export const ITEMS = [
    {
        lable: "用手机",
        img: "../../static/images/Icon/phone.png",
    },
    {
        lable: "着火",
        img: "../../static/images/Icon/fire.png",
    },
    {
        lable: "有老鼠",
        img: "../../static/images/Icon/mice.png"
    },{
        lable: "无人看守",
        img: "../../static/images/Icon/noboby.png"
    },
    {
        lable: "违停",
        img: "../../static/images/Icon/nocar.png"
    },{
        lable: "吸烟",
        img: "../../static/images/Icon/nosmoking.png"
    }
];

export const TABLE_DATA = [
    {
        id:1,
        event:"用手机",
        forbidtime:"07:00-18:00",
        Status:"是"
        
    },
    {
        id:2,
        event:"违停",
        forbidtime:"07:00-18:00",
        Status:"是"
        
    },
    {
        id:3,
        event:"有老鼠",
        forbidtime:"07:00-18:00",
        Status:"是"
        
    },
    {
        id:4,
        event:"无人看守",
        forbidtime:"07:00-18:00",
        Status:"是"
        
    },
    {
        id:5,
        event:"着火",
        forbidtime:"07:00-18:00",
        Status:"是"
        
    }
];

export const MENU_DATA = [
    {
        id:"1",
        icon:"",
        lable:"教学楼区域",
        child:[
            {
                lable:"教学楼一",
                cameraChild:[
                    {
                        id:"1001",
                        lable:"摄像头1"
                    },
                    {
                        id:"1002",
                        lable:"摄像头2"
                    },
                    {
                        id:"1003",
                        lable:"摄像头3"
                    }
                ]
            },
            {
                lable:"教学楼二",
                cameraChild:[
                    {
                        id:"1004",
                        lable:"摄像头4"
                    },
                    {
                        id:"1005",
                        lable:"摄像头5"
                    },
                    {
                        id:"1006",
                        lable:"摄像头6"
                    }
                ]
            }
        ]
    },
    {
        id:"2",
        icon:"",
        lable:"食堂区域",
        child:[
            {
                lable:"食堂一",
                cameraChild:[
                    {
                        id:"2001",
                        lable:"摄像头1"
                    },
                    {
                        id:"2002",
                        lable:"摄像头2"
                    },
                    {
                        id:"2003",
                        lable:"摄像头3"
                    }
                ]
            },
            {
                lable:"食堂二",
                cameraChild:[
                    {
                        id:"2004",
                        lable:"摄像头4"
                    },
                    {
                        id:"2005",
                        lable:"摄像头5"
                    },
                    {
                        id:"2006",
                        lable:"摄像头6"
                    }
                ]
            }
        ]
    },
    {
        id:"3",
        icon:"",
        lable:"操场区域",
        child:[
            {
                lable:"操场一",
                cameraChild:[
                    {
                        id:"3001",
                        lable:"摄像头1"
                    },
                    {
                        id:"3002",
                        lable:"摄像头2"
                    },
                    {
                        id:"3003",
                        lable:"摄像头3"
                    }
                ]
            },
            {
                lable:"操场二",
                cameraChild:[
                    {
                        id:"3004",
                        lable:"摄像头4"
                    },
                    {
                        id:"3005",
                        lable:"摄像头5"
                    },
                    {
                        id:"3006",
                        lable:"摄像头6"
                    }
                ]
            }
        ]
    }
]

