var _0x3268=['value','floor','globalData','join','min','./DataPackage','push','exports','obtain2','obtain1','1F200088','DPI','toString','slice','length'];var _0x4ed9=function(_0x326801,_0x4ed9c4){_0x326801=_0x326801-0x0;var _0x1ba9f1=_0x3268[_0x326801];return _0x1ba9f1;};const HOST_TO_DEVICE_DATA_START=0x1f;const DEVICE_TO_HOST_DATA_START=0x1f;const FIXED_PACKAGE_CRC_RESULT=0x88;const FIXED_NDEF_INTENT_START=0xaa;const FIXED_NDEF_INTENT_END=0xbb;const defaultThreshold=0x80;const maxEBVValue=0x3fff;const superBitmapRLELength=[0x1,0x2,0x3,0x4,0x5,0x6,0x7,0x8,0x9,0xa,0xb,0xc,0x18,0x24,0x30,0x78];const MySendMaxCount=0xff;var supportSuperBitmap=![];const LineActionNone=0x0;const LineActionLine=0x1;const LineActionPrint=0x2;var mByteWidth=0x0;var mLineAction=LineActionNone;var mPrinterDPI=0x0;var mPrinterWidth=0x0;var mLineCount;var mLineBytes;var mLineData;var mPrevBytes;var mPrevData;var mPageParamOffset;var mLELineDots;var mLELineDotsCount;var mLELineDotsIndex;var mMaxSfDots;var mMaxLEDots;var mMinSfDots;var mTotalDots;var mSumLines;var mSumPrints;var mSumRLE_Xs;var mSumRLE_Ds;var mSumRepeats;var mRLEXSaved;var mRLEDSaved;var arrayBitmap;function copyTo(_0x451229,_0x1196a2,_0x38980c,_0x2fb948,_0x30753e){if(_0x451229==_0x38980c){if(_0x1196a2==_0x2fb948)return;if(_0x1196a2>_0x2fb948){_0x1196a2+=_0x30753e-_0x2fb948-0x1;for(--_0x30753e;_0x30753e>=_0x2fb948;--_0x30753e,--_0x1196a2)_0x451229[_0x1196a2]=_0x38980c[_0x30753e];return;}}for(;_0x2fb948<_0x30753e;++_0x2fb948,++_0x1196a2)_0x451229[_0x1196a2]=_0x38980c[_0x2fb948];}function pageStartData(){return _0x4ed9('0xa');}function pageEndData(){return[0x1f,0x28,0x0,0x88];}function pageWidthData(_0x121aeb){_0x121aeb=Math[_0x4ed9('0x1')]((_0x121aeb+0x7)/0x8);if(_0x121aeb>=0xc0){return[0x1f,0x27,0x2,0xc0|_0x121aeb>>0x8,_0x121aeb&0xff,0x88];}else{return[0x1f,0x27,0x1,_0x121aeb,0x88];}}function pageHeightData(_0x512b5b){if(_0x512b5b>0x3fff){return[0x1f,0x26,0x3,0xc0,0x3fff|_0x512b5b>>0x8,_0x512b5b&0xff,0x88];}else if(_0x512b5b>=0xc0){return[0x1f,0x26,0x2,0xc0|_0x512b5b>>0x8,_0x512b5b&0xff,0x88];}else{return[0x1f,0x26,0x1,_0x512b5b,0x88];}}function settingGapTypeData(_0x307255){return[0x1f,0x42,0x1,_0x307255,0x88];}function settingGapLengthData(_0x323c89){if(_0x323c89>0x3fff){return[0x1f,0x45,0x3,0xc0|_0x323c89>>0x10,_0x323c89>>0x8,_0x323c89&0xff,0x88];}else if(_0x323c89>=0xc0){return[0x1f,0x45,0x2,0xc0|_0x323c89>>0x8,_0x323c89&0xff,0x88];}else{return[0x1f,0x45,0x1,_0x323c89,0x88];}}function settingStrengthData(_0x466a1b){return[0x1f,0x43,0x1,_0x466a1b,0x88];}function settingSpeedData(_0x3cfb1a){return[0x1f,0x44,0x1,_0x3cfb1a,0x88];}function arrayWithImage(_0x5e8aff,_0x16b552,_0x5a8c7b,_0x2b25f2,_0x3eb71d,_0x252f54,_0x237da3,_0xda3fdf){supportSuperBitmap=_0xda3fdf;var _0x1905bf=getApp()[_0x4ed9('0x2')]['currentPrinter'];mPrinterDPI=_0x1905bf[_0x4ed9('0xb')];mPrinterWidth=_0x1905bf['width'];arrayBitmap=new Array();mLELineDots=[mPrinterDPI*0x3/25.4+0.5];mLineAction=LineActionLine;mByteWidth=Math['floor']((mPrinterWidth+0x7)/0x8);mLineCount=0x0;mLineBytes=0x0;mLineData=null;mPrevBytes=0x0;mPrevData=null;mLELineDotsCount=0x0;mLELineDotsIndex=0x0;mMaxSfDots=0x0;mMaxLEDots=0x0;mMinSfDots=0x0;mTotalDots=0x0;mSumLines=0x0;mSumPrints=0x0;mSumRLE_Xs=0x0;mSumRLE_Ds=0x0;mSumRepeats=0x0;mRLEXSaved=0x0;mRLEDSaved=0x0;pushPackageWithData(pageWidthData(_0x16b552));pushPackageWithData(pageHeightData(_0x5a8c7b));if(_0x2b25f2>=0x0){pushPackageWithData(settingGapTypeData(_0x2b25f2));}if(_0x2b25f2!=0x0){pushPackageWithData(settingGapLengthData(_0x3eb71d));}if(_0x252f54>0x0){pushPackageWithData(settingStrengthData(_0x252f54-0x1));}if(_0x237da3>0x0){pushPackageWithData(settingSpeedData(_0x237da3-0x1));}parsePixelDatas(_0x5e8aff,_0x16b552,_0x5a8c7b);switch(mLineAction){case LineActionLine:{pushLineWithCount(mLineCount);break;}case LineActionPrint:{pushPrint();pushLineWithCount(0x0);break;}default:return![];}mLineAction=LineActionNone;arrayBitmap['unshift'](pageStartData());pushPackageWithData(pageEndData());return arrayBitmap;}function parsePixelDatas(_0x19595f,_0x21b6df,_0x2ef6e0){var _0xa2b6bf;var _0x46fc2d=0x0;var _0x496bd3=Math[_0x4ed9('0x1')]((_0x21b6df+0x7)/0x8);for(var _0x56f6fe=0x0;_0x56f6fe<_0x2ef6e0;_0x56f6fe++){var _0x2ca7b6=[_0x496bd3];for(var _0x2c5e23=0x0;_0x2c5e23<_0x496bd3;_0x2c5e23++){_0x2ca7b6[_0x2c5e23]=0x0;}var _0x51e21a=0x0;var _0x26cf2d=0x0;var _0x45afda=0x0;var _0x407471=0x0;var _0x2a2585=0x0;var _0x7a1018=0x0;var _0x1b9eb6=0x0;var _0x54a765=0x0;for(var _0x589563=0x0;_0x589563<_0x21b6df;_0x589563++){var _0x442de3=_0x589563%0x8;if(_0x442de3==0x0){_0x51e21a=0x0;_0x26cf2d=0x0;_0x45afda=0x0;_0x407471=0x0;_0x2a2585=0x0;_0x7a1018=0x0;_0x1b9eb6=0x0;_0x54a765=0x0;}var _0x4b6cb7=(_0x21b6df*_0x56f6fe+_0x589563)*0x4;var _0x9bcd3c=_0x19595f[_0x4b6cb7+0x0];var _0x349fc4=_0x19595f[_0x4b6cb7+0x1];var _0x1a0f41=_0x19595f[_0x4b6cb7+0x2];var _0x55a0dc=_0x19595f[_0x4b6cb7+0x3];if(_0x55a0dc>0x0){var _0x37e70f=_0x9bcd3c*0.3+_0x349fc4*0.59+_0x1a0f41*0.11;if(_0x37e70f<=defaultThreshold){if(_0x442de3==0x0){_0x51e21a=0x80;}else if(_0x442de3==0x1){_0x26cf2d=0x80>>0x1;}else if(_0x442de3==0x2){_0x45afda=0x80>>0x2;}else if(_0x442de3==0x3){_0x407471=0x80>>0x3;}else if(_0x442de3==0x4){_0x2a2585=0x80>>0x4;}else if(_0x442de3==0x5){_0x7a1018=0x80>>0x5;}else if(_0x442de3==0x6){_0x1b9eb6=0x80>>0x6;}else if(_0x442de3==0x7){_0x54a765=0x80>>0x7;}}}if(_0x442de3==0x7||_0x589563==_0x21b6df-0x1){var _0x4b6cb7=Math[_0x4ed9('0x1')](_0x589563/0x8);var _0x1a89be=_0x51e21a|_0x26cf2d|_0x45afda|_0x407471|_0x2a2585|_0x7a1018|_0x1b9eb6|_0x54a765;_0x2ca7b6[_0x4b6cb7]=_0x1a89be;}}var _0x335e3a=_0x496bd3-0x1;for(;_0x335e3a>=0x0;_0x335e3a--){if(_0x2ca7b6[_0x335e3a]!=0x0){break;}}var _0x24e01c=0x0;for(;_0x24e01c<_0x335e3a;_0x24e01c++){if(_0x2ca7b6[_0x24e01c]!=0x0){break;}}var _0x2646ec=_0x335e3a+0x1-_0x24e01c;var _0x1a57e4=[_0x2646ec+0x4];_0x1a57e4[0x0]=0x1f;_0x1a57e4[0x1]=0x2b;_0x1a57e4[0x2]=_0x24e01c;_0x1a57e4[0x3]=_0x2646ec;if(_0x2646ec>0x0){for(var _0x4ce842=0x0;_0x4ce842<_0x2646ec;_0x4ce842++){_0x1a57e4[_0x4ce842+0x4]=_0x2ca7b6[_0x4ce842+_0x24e01c];}}if(_0xa2b6bf==null){_0xa2b6bf=_0x1a57e4;pushPackageWithData(_0x1a57e4);}else{if(_0x1a57e4['toString']()==_0xa2b6bf[_0x4ed9('0xc')]()&&_0x46fc2d<0x96){_0x46fc2d++;}else{if(_0x46fc2d>0x0){var _0x4bf8bc=[0x1f,0x2e,_0x46fc2d-0x1];pushPackageWithData(_0x4bf8bc);_0x46fc2d=0x0;}_0xa2b6bf=_0x1a57e4;pushPackageWithData(_0x1a57e4);}}}if(_0x46fc2d>0x0){var _0x4bf8bc=[0x1f,0x2e,_0x46fc2d-0x1];pushPackageWithData(_0x4bf8bc);}}function addNoneRow(_0x5bc059){if(_0x5bc059>0x0){if(_0x5bc059<=MySendMaxCount){pushPackageWithData([0x1f,0x2a,_0x5bc059,0x0,0x0]);}else{for(var _0x9e61d7=MySendMaxCount;_0x9e61d7>0x0;){pushPackageWithData([0x1f,0x2a,_0x9e61d7,0x0,0x0]);_0x5bc059-=_0x9e61d7;_0x9e61d7=_0x5bc059>MySendMaxCount?MySendMaxCount:_0x5bc059;}}}}function printRow(_0x345d55,_0x36ed7a){if(mLineAction==LineActionNone){return![];}var _0x1bb4fa;for(_0x1bb4fa=Math[_0x4ed9('0x4')](_0x345d55[_0x4ed9('0xe')],mByteWidth)-0x1;_0x1bb4fa>=0x0;--_0x1bb4fa){if(_0x345d55[_0x1bb4fa]!=0x0){break;}}if(_0x1bb4fa<0x0){return lineWithCount(_0x36ed7a);}++_0x1bb4fa;switch(mLineAction){case LineActionLine:{pushLineWithCount(mLineCount);break;}case LineActionPrint:{if(mLineBytes==_0x1bb4fa&&equalsByteWithData1(mLineData,_0x345d55,0x0,_0x1bb4fa)){mLineCount+=_0x36ed7a;return!![];}pushPrint();break;}default:return![];}mPrevData=mLineData;mPrevBytes=mLineBytes;mLineData=_0x345d55;mLineBytes=_0x1bb4fa;mLineCount=_0x36ed7a;mLineAction=LineActionPrint;return!![];}function equalsByteWithData1(_0x3fb582,_0x551cdf,_0x55114f,_0x34e0d8){if(_0x55114f<0x0||_0x55114f>=_0x34e0d8){return![];}if(_0x34e0d8>_0x3fb582['length']||_0x34e0d8>_0x551cdf[_0x4ed9('0xe')]){return![];}var _0x4a0cd8=_0x3fb582['slice'](_0x55114f,_0x34e0d8)[_0x4ed9('0x3')]();var _0x50fb27=_0x551cdf[_0x4ed9('0xd')](_0x55114f,_0x34e0d8)[_0x4ed9('0x3')]();if(_0x4a0cd8!=_0x50fb27){return![];}return!![];}function appendRLEData(_0x452295,_0x50639c,_0x9ca5df,_0x145c63){if(_0x145c63<=0x0)return!![];var _0x20fc86=_0x50639c['value']*0x5/0x8;var _0x20de54=0x10-0x1;while(_0x145c63>0x0){if(_0x145c63>=superBitmapRLELength[_0x20de54]){_0x145c63-=superBitmapRLELength[_0x20de54];var _0x45b5c4=_0x20de54|(_0x9ca5df?0x10:0x0);_0x50639c[_0x4ed9('0x0')]=_0x50639c['value']+0x1;if(_0x50639c['value']*0x5>mByteWidth*0x8)return![];switch(_0x50639c['value']%0x8){case 0x0:_0x452295[_0x20fc86++]|=_0x45b5c4;break;case 0x1:_0x452295[_0x20fc86]|=_0x45b5c4<<0x3;break;case 0x2:_0x452295[_0x20fc86++]|=_0x45b5c4>>>0x2;_0x452295[_0x20fc86]|=(_0x45b5c4&0x3)<<0x6;break;case 0x3:_0x452295[_0x20fc86]|=_0x45b5c4<<0x1;break;case 0x4:_0x452295[_0x20fc86++]|=_0x45b5c4>>>0x4;_0x452295[_0x20fc86]|=(_0x45b5c4&0xf)<<0x4;break;case 0x5:_0x452295[_0x20fc86++]|=_0x45b5c4>>>0x1;_0x452295[_0x20fc86]|=(_0x45b5c4&0x1)<<0x7;break;case 0x6:_0x452295[_0x20fc86]|=_0x45b5c4<<0x2;break;case 0x7:_0x452295[_0x20fc86++]|=_0x45b5c4>>>0x3;_0x452295[_0x20fc86]|=(_0x45b5c4&0x7)<<0x5;break;default:break;}}else{--_0x20de54;}}return!![];}function calcRLEX(_0x94fff3,_0x475001,_0x5b6be6){if(_0x475001<=0x0)return 0x0;var _0x4172b4=0x0;var _0x54174b=0x0;var _0x2b5175=![];var _0x11dd87=0x80;var _0x5bb1d0={'value':0x0};while(!![]){if((_0x94fff3[_0x54174b]&_0x11dd87)!=0x0){if(_0x2b5175){++_0x4172b4;}else{if(!appendRLEData(_0x5b6be6,_0x5bb1d0,![],_0x4172b4))return 0x0;_0x2b5175=!![];_0x4172b4=0x1;}}else{if(_0x2b5175){if(!appendRLEData(_0x5b6be6,_0x5bb1d0,!![],_0x4172b4))return 0x0;_0x2b5175=![];_0x4172b4=0x1;}else{++_0x4172b4;}}if(_0x11dd87==0x1){++_0x54174b;if(_0x54174b>=_0x475001)break;_0x11dd87=0x80;}else{_0x11dd87>>>=0x1;}}if(_0x2b5175&&!appendRLEData(_0x5b6be6,_0x5bb1d0,!![],_0x4172b4))return 0x0;return _0x5bb1d0[_0x4ed9('0x0')];}function calcRLED(_0x245eeb,_0x4eb0f3,_0xd120d5,_0x225c75,_0x17fa0e){var _0x223517=0x0;var _0xed4a8d=0x0;var _0x26cc1b=![];var _0x90abc5=0x80;var _0x2765c5={'value':0x0};var _0x157b91=Math['min'](_0x4eb0f3,_0x225c75);if(_0x157b91>0x0){while(!![]){if((_0xd120d5[_0xed4a8d]&_0x90abc5)!=(_0x245eeb[_0xed4a8d]&_0x90abc5)){if(_0x26cc1b){++_0x223517;}else{if(!appendRLEData(_0x17fa0e,_0x2765c5,![],_0x223517))return 0x0;_0x26cc1b=!![];_0x223517=0x1;}}else{if(_0x26cc1b){if(!appendRLEData(_0x17fa0e,_0x2765c5,!![],_0x223517))return 0x0;_0x26cc1b=![];_0x223517=0x1;}else{++_0x223517;}}if(_0x90abc5==0x1){++_0xed4a8d;if(_0xed4a8d>=_0x157b91)break;_0x90abc5=0x80;}else{_0x90abc5>>>=0x1;}}}if(_0x4eb0f3!=_0x225c75){if(_0x4eb0f3<_0x225c75){_0x245eeb=_0xd120d5;_0x4eb0f3=_0x225c75;}_0x90abc5=0x80;while(!![]){if(0x0!=(_0x245eeb[_0xed4a8d]&_0x90abc5)){if(_0x26cc1b){++_0x223517;}else{if(!appendRLEData(_0x17fa0e,_0x2765c5,![],_0x223517))return 0x0;_0x26cc1b=!![];_0x223517=0x1;}}else{if(_0x26cc1b){if(!appendRLEData(_0x17fa0e,_0x2765c5,!![],_0x223517))return 0x0;_0x26cc1b=![];_0x223517=0x1;}else{++_0x223517;}}if(_0x90abc5==0x1){++_0xed4a8d;if(_0xed4a8d>=_0x4eb0f3)break;_0x90abc5=0x80;}else{_0x90abc5>>>=0x1;}}}if(_0x26cc1b&&!appendRLEData(_0x17fa0e,_0x2765c5,!![],_0x223517))return 0x0;return _0x2765c5['value'];}function pushEBV(_0x4af9bb,_0x4752be,_0x4d3242){if(_0x4d3242>=0xc0){_0x4af9bb[_0x4752be+0x0]=_0x4d3242>>>0x8|0xc0;_0x4af9bb[_0x4752be+0x1]=_0x4d3242&0xff;return _0x4752be+0x2;}else{_0x4af9bb[_0x4752be+0x0]=_0x4d3242;return _0x4752be+0x1;}}function pushRepeat(_0x48ef52){if(_0x48ef52<=0x0){return;}mSumRepeats+=_0x48ef52;var _0x165eac=[0x1f,0x2e,0x0,0x0];for(;_0x48ef52>maxEBVValue;_0x48ef52-=maxEBVValue+0x1){pushEBV(_0x165eac,0x2,maxEBVValue);var _0x139209=require(_0x4ed9('0x5'));pushPackageWithData(_0x139209[_0x4ed9('0x9')](_0x165eac));}if(_0x48ef52>0x0){var _0x358bed=pushEBV(_0x165eac,0x2,_0x48ef52-0x1);var _0x139209=require('./DataPackage');pushPackageWithData(_0x139209[_0x4ed9('0x8')](_0x165eac,_0x358bed));}}function pushPrintDots(_0x5715cc,_0x3a9767){if(mMaxSfDots<_0x5715cc){mMaxSfDots=_0x5715cc;}else if(_0x5715cc>0x0){if(mMinSfDots==0x0||mMinSfDots>_0x5715cc)mMinSfDots=_0x5715cc;}mTotalDots+=_0x5715cc*_0x3a9767;if(_0x3a9767>=mLELineDots[_0x4ed9('0xe')]){for(var _0xfa58dd=0x0;_0xfa58dd<mLELineDots[_0x4ed9('0xe')];++_0xfa58dd)mLELineDots[_0xfa58dd]=_0x5715cc;mLELineDotsCount=mLELineDots[_0x4ed9('0xe')]*_0x5715cc;if(mMaxLEDots<_0x5715cc)mMaxLEDots=_0x5715cc;}else{mLELineDotsCount+=_0x3a9767*_0x5715cc;for(var _0xfa58dd=0x0;_0xfa58dd<_0x3a9767;++_0xfa58dd){mLELineDotsCount-=mLELineDots[mLELineDotsIndex];mLELineDots[mLELineDotsIndex]=_0x5715cc;++mLELineDotsIndex;if(mLELineDotsIndex>=mLELineDots[_0x4ed9('0xe')])mLELineDotsIndex=0x0;}var _0x203e61=mLELineDotsCount/mLELineDots['length'];if(mMaxLEDots<_0x203e61)mMaxLEDots=_0x203e61;}}function pushRLE(_0x375022,_0x5f1143,_0x13c7e6){if(_0x13c7e6<=0x0)return;var _0x135a62=(_0x13c7e6*0x5+0x8-0x1)/0x8;var _0xdde1eb=[0x2+0x2+_0x135a62+0x4];_0xdde1eb[0x0]=0x1f;_0xdde1eb[0x1]=_0x375022;var _0x4573cb=pushEBV(_0xdde1eb,0x2,_0x13c7e6);copyTo(_0xdde1eb,_0x4573cb,_0x5f1143,0x0,_0x135a62);var _0x2f101f=require('./DataPackage');pushPackageWithData(_0x2f101f['obtain3'](_0xdde1eb,0x0,_0x4573cb+_0x135a62));}function pushPrint(){if(mLineCount<=0x0){return;}var _0x154cb4=mLineData;var _0x330898=mLineCount;var _0x43d711=0x0;var _0x38b01b=0x0;var _0x461db9=0x0;for(;_0x43d711<mLineBytes;++_0x43d711){if(_0x154cb4[_0x43d711]!=0x0){break;}}_0x38b01b=mLineBytes-_0x43d711;for(var _0x345e7e=_0x43d711;_0x345e7e<mLineBytes;++_0x345e7e){_0x461db9+=getBit1Count(_0x154cb4[_0x345e7e]);}pushPrintDots(_0x461db9,_0x330898);if(mSumPrints>0x0){var _0x54ad53=[mByteWidth+0x4];var _0x3daa24=[mByteWidth+0x4];var _0x3879c0=0x0;var _0x523fa1=0x0;_0x3879c0=calcRLEX(_0x154cb4,mLineBytes,_0x54ad53);_0x523fa1=calcRLED(mPrevData,mPrevBytes,_0x154cb4,mLineBytes,_0x3daa24);var _0x46c85e=(_0x43d711>=0xc0?0x4:0x3)+(_0x38b01b>=0xc0?0x2:0x1)+_0x38b01b;var _0x2465e7=_0x3879c0<=0x0?mByteWidth+0x64:(_0x3879c0*0x5+0x8-0x1)/0x8+(_0x3879c0>=0xc0?0x4:0x3);var _0x26809a=_0x523fa1<=0x0?mByteWidth+0x64:(_0x523fa1*0x5+0x8-0x1)/0x8+(_0x523fa1>=0xc0?0x4:0x3);if(_0x2465e7<_0x46c85e&&_0x2465e7<=_0x26809a){mSumRLE_Xs+=_0x330898;mRLEXSaved+=_0x46c85e-_0x2465e7;pushRLE(0x2c,_0x54ad53,_0x3879c0);}else if(_0x26809a<_0x46c85e){mSumRLE_Ds+=_0x330898;mRLEDSaved+=_0x46c85e-_0x26809a;pushRLE(0x2d,_0x3daa24,_0x523fa1);}else{mSumPrints+=_0x330898;var _0xb9ec57=[0x6+_0x38b01b];_0xb9ec57[0x0]=0x1f;_0xb9ec57[0x1]=0x2b;var _0x4e0485=pushEBV(_0xb9ec57,0x2,_0x43d711);_0x4e0485=pushEBV(_0xb9ec57,_0x4e0485,_0x38b01b);copyTo(_0xb9ec57,_0x4e0485,_0x154cb4,_0x43d711,mLineBytes);var _0x548ce7=require(_0x4ed9('0x5'));pushPackageWithData(_0x548ce7['obtain2'](_0xb9ec57,_0x4e0485+_0x38b01b));}pushRepeat(_0x330898-0x1);}else{mSumPrints+=_0x330898;var _0x16d349=[0x4];var _0x4e0485=pushEBV(_0x16d349,0x0,0x3fff);_0x4e0485=pushEBV(_0x16d349,_0x4e0485,_0x43d711);for(;_0x330898>0x3fff;_0x330898-=0x3fff+0x1){var _0x548ce7=require('./DataPackage');pushPackageWithData(_0x548ce7['DataPackage7'](0x21,_0x16d349,0x0,_0x4e0485,_0x154cb4,_0x43d711,mLineBytes));}if(_0x330898>0x0){_0x4e0485=pushEBV(_0x16d349,0x0,_0x330898-0x1);_0x4e0485=pushEBV(_0x16d349,_0x4e0485,_0x43d711);var _0x548ce7=require('./DataPackage');pushPackageWithData(_0x548ce7['DataPackage7'](0x21,_0x16d349,0x0,_0x4e0485,_0x154cb4,_0x43d711,mLineBytes));}}}function getBit1Count(_0x5531cf){return sBitCount[_0x5531cf&0xff];}function pushLineWithCount(_0x40a2c1){if(_0x40a2c1<=0x0){return;}pushPrintDots(0x0,_0x40a2c1);mSumLines+=_0x40a2c1;for(;_0x40a2c1>maxEBVValue;_0x40a2c1-=maxEBVValue+0x1){pushPackageWithCmd(CMD_PAGE_LINE,maxEBVValue,!![]);}if(_0x40a2c1>0x0){if(_0x40a2c1<=0xff){pushPackageWithData(nullLineDataWithCount(_0x40a2c1));}else{pushPackageWithCmd(CMD_PAGE_LINE,_0x40a2c1-0x1,!![]);}}}function nullLineDataWithCount(_0x1de521){return[0x1b,0x4a,_0x1de521];}function lineWithCount(_0x5333dd){switch(mLineAction){case LineActionLine:{mLineCount+=_0x5333dd;return!![];}case LineActionPrint:{pushPrint();break;}default:return![];}mPrevData=mLineData;mPrevBytes=mLineBytes;mLineData=null;mLineBytes=0x0;mLineCount=_0x5333dd;mLineAction=LineActionLine;return!![];}function pushPackageWithData(_0x252a71){var _0x3eb091=new Array();for(var _0x5de5fa=0x0;_0x5de5fa<_0x252a71['length'];_0x5de5fa++){var _0x2af45e=parseInt(_0x252a71[_0x5de5fa]);var _0xe8f0cb=_0x2af45e['toString'](0x10);if(_0xe8f0cb[_0x4ed9('0xe')]%0x2==0x1){var _0x33d60c='0'+_0xe8f0cb;_0x3eb091[_0x4ed9('0x6')](_0x33d60c);}else{_0x3eb091[_0x4ed9('0x6')](_0xe8f0cb);}}arrayBitmap[_0x4ed9('0x6')](_0x3eb091['join'](''));}module[_0x4ed9('0x7')]={'arrayWithImage':arrayWithImage};var sBitCount=[0x0,0x1,0x1,0x2,0x1,0x2,0x2,0x3,0x1,0x2,0x2,0x3,0x2,0x3,0x3,0x4,0x1,0x2,0x2,0x3,0x2,0x3,0x3,0x4,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x1,0x2,0x2,0x3,0x2,0x3,0x3,0x4,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x1,0x2,0x2,0x3,0x2,0x3,0x3,0x4,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x4,0x5,0x5,0x6,0x5,0x6,0x6,0x7,0x1,0x2,0x2,0x3,0x2,0x3,0x3,0x4,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x4,0x5,0x5,0x6,0x5,0x6,0x6,0x7,0x2,0x3,0x3,0x4,0x3,0x4,0x4,0x5,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x4,0x5,0x5,0x6,0x5,0x6,0x6,0x7,0x3,0x4,0x4,0x5,0x4,0x5,0x5,0x6,0x4,0x5,0x5,0x6,0x5,0x6,0x6,0x7,0x4,0x5,0x5,0x6,0x5,0x6,0x6,0x7,0x5,0x6,0x6,0x7,0x6,0x7,0x7,0x8];