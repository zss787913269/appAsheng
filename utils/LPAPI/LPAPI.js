var _0x1ae0=['globalData','setSupportPrefixs','sendData','fillRect','height','log','length','translate','right','canvasGetImageData','black','toUpperCase','loading','connectPeripheral','canvasId','没有此画布','DPI','push','restore','width','data','deviceId','setFillStyle','disconnectPeripheral','setLineWidth','strokeRect','sort','arrayWithImage','canvasPutImageData','showToast','startScanPeripherals','draw','setTextAlign','setFontSize','RSSI','rotate','currentPrinter','./DzBLE.js','save','name','hideToast'];var _0xe10f=function(_0x1ae0e6,_0xe10fb8){_0x1ae0e6=_0x1ae0e6-0x0;var _0x2f5980=_0x1ae0[_0x1ae0e6];return _0x2f5980;};var dzBLE=require(_0xe10f('0x25'));var bitmapPackage=require('./BitmapPackage.js');var barcodeWriter=require('./BarcodeWriter.js');var printWidth=0x0;var printHeight=0x0;var printOrientation=0x0;var itemOrientation=0x0;var itemHorizontalAlignment=0x0;var itemVerticalAlignment=0x0;var connectPrinterTimer;var canConnect=!![];var printPageGapType=-0x1;var printPageGapLength=0x2;var printDarkness=0x0;var printSpeed=0x0;var hasInit=![];var canvas=null;var canvasJS=null;var filePath=null;var isConnecting=![];function covert(_0x10c11e){_0x10c11e=_0x10c11e*DPI()/25.4;_0x10c11e=_0x10c11e>=0x0?_0x10c11e+0.1:_0x10c11e-0.1;return parseInt(_0x10c11e);}function DPI(){var _0x3d87d2=getApp()[_0xe10f('0x0')]['currentPrinter'];var _0x4cee85=_0x3d87d2[_0xe10f('0x10')];return _0x4cee85;}function setPrintPageGapType(_0x4b1027){printPageGapType=_0x4b1027;}function setPrintPageGapLength(_0x480340){printPageGapLength=_0x480340;}function setPrintDarkness(_0xd27509){printDarkness=_0xd27509;}function setPrintSpeed(_0x1bcb44){printSpeed=_0x1bcb44;}function setSupportPrefixs(_0x1c5663){dzBLE[_0xe10f('0x1')](_0x1c5663);}function connectingPrinterName(){var _0x142a0d=getApp()['globalData']['currentPrinter'];return _0x142a0d['name'];}function initLPAPI(){isConnecting=![];hasInit=![];}function initPrinterCenter(_0x4f5249){if(hasInit){dzBLE[_0xe10f('0x1e')](function(_0xbd4810){_0x4f5249(_0xbd4810);});}else{dzBLE['initBLE'](function(_0x41ae69){hasInit=!![];_0x4f5249(_0x41ae69);});}}function scanedPrinters(_0x5e3249){initPrinterCenter(function(_0x389854){_0x5e3249(_0x389854);});}function compare(_0x20f069){return function(_0x5d920c,_0xd87187){var _0x470110=_0x5d920c[_0x20f069];var _0x4a435d=_0xd87187[_0x20f069];return _0x4a435d-_0x470110;};}function openPrinter(_0x495015,_0x2ab9f5,_0x125dda){if(isConnecting){_0x2ab9f5();return;}initPrinterCenter(function(_0x12d79a){if(_0x12d79a[_0xe10f('0x6')]>0x0){if(_0x495015==null||_0x495015[_0xe10f('0x6')]==0x0){_0x12d79a[_0xe10f('0x1a')](compare(_0xe10f('0x22')));dzBLE['connectPeripheral'](_0x12d79a[0x0]['deviceId'],function(){isConnecting=!![];_0x2ab9f5();},function(){isConnecting=![];_0x125dda();});}else{for(var _0x5db65a=0x0;_0x5db65a<_0x12d79a[_0xe10f('0x6')];_0x5db65a++){var _0x3c27ac=_0x12d79a[_0x5db65a];var _0x1a696a=_0x3c27ac[_0xe10f('0x27')]['substring'](0x0,_0x495015[_0xe10f('0x6')]);if(_0x1a696a[_0xe10f('0xb')]()==_0x495015[_0xe10f('0xb')]()){dzBLE[_0xe10f('0xd')](_0x3c27ac[_0xe10f('0x15')]);break;}}}}else{wx[_0xe10f('0x1d')]({'title':'没有发现打印机','icon':'','image':'','duration':0x7d0,'mask':!![],'success':function(_0x22d666){},'fail':function(_0x6cdb65){},'complete':function(_0x4240f5){}});}});}function connectingPrinterDetailInfos(){var _0x46fa72=getApp()['globalData'][_0xe10f('0x24')];return _0x46fa72;}function closePrinter(){dzBLE[_0xe10f('0x17')]();}function startDrawLabel(_0x478346,_0x2311e1,_0x9e1076,_0x13c836,_0x299f4c){canvas=wx['createCanvasContext'](_0x478346);if(canvas==null){wx[_0xe10f('0x1d')]({'title':_0xe10f('0xf'),'icon':'','image':'','duration':0x7d0,'mask':!![],'success':function(_0x23dfc9){},'fail':function(_0x269942){},'complete':function(_0xe1aca0){}});}else{wx['showToast']({'title':'正在生成标签图片','icon':_0xe10f('0xc'),'image':'','duration':0x2710,'mask':!![],'success':function(_0x2deb50){},'fail':function(_0x2ceb78){},'complete':function(_0x29f866){}});printOrientation=_0x299f4c;printWidth=covert(_0x9e1076);printHeight=covert(_0x13c836);itemOrientation=0x0;itemHorizontalAlignment=0x0;itemVerticalAlignment=0x0;canvasJS=_0x2311e1;canvas['clearRect'](0x0,0x0,canvas[_0xe10f('0x13')],canvas[_0xe10f('0x4')]);canvas[_0xe10f('0x1f')]();canvasJS['setData']({'canvasWidth':printWidth,'canvasHeight':printHeight});canvas[_0xe10f('0x16')]('white');canvas['fillRect'](0x0,0x0,printWidth+0x5,printHeight+0x5);canvas['setFillStyle']('black');}}function endDrawLabel(){canvas[_0xe10f('0x1f')](!![],setTimeout(function(){if(printOrientation==0x0){wx[_0xe10f('0x28')]();}else{wx[_0xe10f('0x9')]({'canvasId':canvas['canvasId'],'x':0x0,'y':0x0,'width':printWidth,'height':printHeight,'success'(_0xcb06c3){var _0x781af8=_0xcb06c3[_0xe10f('0x14')];var _0x40a737=new Array();if(printOrientation==0x5a){for(var _0x31ebc0=printWidth-0x1;_0x31ebc0>=0x0;_0x31ebc0--){for(var _0x4ae4c0=0x0;_0x4ae4c0<printHeight;_0x4ae4c0++){var _0x1323cb=(printWidth*_0x4ae4c0+_0x31ebc0)*0x4;_0x40a737[_0xe10f('0x11')](_0x781af8[_0x1323cb+0x0]);_0x40a737['push'](_0x781af8[_0x1323cb+0x1]);_0x40a737['push'](_0x781af8[_0x1323cb+0x2]);_0x40a737['push'](_0x781af8[_0x1323cb+0x3]);}}var _0x1b6b90=printWidth;printWidth=printHeight;printHeight=_0x1b6b90;}else if(printOrientation==0xb4){for(var _0x4ae4c0=printHeight-0x1;_0x4ae4c0>=0x0;_0x4ae4c0--){for(var _0x31ebc0=printWidth-0x1;_0x31ebc0>=0x0;_0x31ebc0--){var _0x1323cb=(printWidth*_0x4ae4c0+_0x31ebc0)*0x4;_0x40a737[_0xe10f('0x11')](_0x781af8[_0x1323cb+0x0]);_0x40a737['push'](_0x781af8[_0x1323cb+0x1]);_0x40a737[_0xe10f('0x11')](_0x781af8[_0x1323cb+0x2]);_0x40a737[_0xe10f('0x11')](_0x781af8[_0x1323cb+0x3]);}}}else if(printOrientation==0x10e){for(var _0x31ebc0=0x0;_0x31ebc0<printWidth;_0x31ebc0++){for(var _0x4ae4c0=printHeight-0x1;_0x4ae4c0>=0x0;_0x4ae4c0--){var _0x1323cb=(printWidth*_0x4ae4c0+_0x31ebc0)*0x4;_0x40a737['push'](_0x781af8[_0x1323cb+0x0]);_0x40a737['push'](_0x781af8[_0x1323cb+0x1]);_0x40a737['push'](_0x781af8[_0x1323cb+0x2]);_0x40a737['push'](_0x781af8[_0x1323cb+0x3]);}}var _0x1b6b90=printWidth;printWidth=printHeight;printHeight=_0x1b6b90;}canvasJS['setData']({'canvasWidth':printWidth,'canvasHeight':printHeight});var _0x252232=new Uint8ClampedArray(_0x40a737);wx[_0xe10f('0x1c')]({'canvasId':canvas['canvasId'],'data':_0x252232,'x':0x0,'y':0x0,'width':printWidth,'height':printHeight,'success'(_0x392a36){wx[_0xe10f('0x28')]();},'fail'(_0x185108){console[_0xe10f('0x5')](_0x185108);}});}});}},0x3e8));}function print(_0x52c430){wx['showToast']({'title':'正在生成打印数据','icon':_0xe10f('0xc'),'image':'','duration':0x2710,'mask':!![],'success':function(_0x1ecbaa){},'fail':function(_0x14e289){},'complete':function(_0xa62221){}});wx['canvasGetImageData']({'canvasId':canvas[_0xe10f('0xe')],'x':0x0,'y':0x0,'width':printWidth,'height':printHeight,'success'(_0x352098){console['log']('标签宽度：'+_0x352098[_0xe10f('0x13')]);console['log']('标签高度：'+_0x352098[_0xe10f('0x4')]);var _0x302ff1=bitmapPackage[_0xe10f('0x1b')](_0x352098['data'],_0x352098['width'],_0x352098['height'],printPageGapType,printPageGapLength*0x64,printDarkness,printSpeed,![]);wx['hideToast']();dzBLE[_0xe10f('0x2')](_0x302ff1,function(){_0x52c430();});}});}function setItemOrientation(_0xe18840){if(_0xe18840!=0x0&&_0xe18840!=0x5a&&_0xe18840!=0xb4&&_0xe18840!=0x10e){return;}itemOrientation=_0xe18840;}function setItemHorizontalAlignment(_0x224146){if(_0x224146!=0x0&&_0x224146!=0x1&&_0x224146!=0x2){return;}itemHorizontalAlignment=_0x224146;}function setItemVerticalAlignment(_0x175d5d){if(_0x175d5d!=0x0&&_0x175d5d!=0x1&&_0x175d5d!=0x2){return;}itemVerticalAlignment=_0x175d5d;}function drawText(_0x5304c3,_0x2ba820,_0x337f46,_0x2d1b0a){canvas[_0xe10f('0x21')](covert(_0x2d1b0a));switch(itemHorizontalAlignment){case 0x0:{canvas[_0xe10f('0x20')]('left');break;}case 0x1:{canvas[_0xe10f('0x20')]('center');break;}case 0x2:{canvas[_0xe10f('0x20')](_0xe10f('0x8'));break;}default:break;}canvas['fillText'](_0x5304c3,covert(_0x2ba820),covert(_0x337f46));}function drawBarcode(_0x234f94,_0x66b2d3,_0x5a8eba,_0x170720,_0x491d6f){_0x66b2d3=covert(_0x66b2d3);_0x5a8eba=covert(_0x5a8eba);_0x170720=covert(_0x170720);_0x491d6f=covert(_0x491d6f);canvas['save']();switch(itemOrientation){case 0x1:case 0x5a:{canvas[_0xe10f('0x23')](Math['PI']/0x2);canvas[_0xe10f('0x7')](parseInt(_0x5a8eba-_0x66b2d3),parseInt(-_0x66b2d3-_0x5a8eba-_0x170720));var _0x215551=_0x170720;_0x170720=_0x491d6f;_0x491d6f=_0x215551;break;}case 0x2:case 0xb4:{canvas[_0xe10f('0x23')](Math['PI']);canvas['translate'](parseInt(-_0x66b2d3*0x2-_0x170720),parseInt(-_0x5a8eba*0x2-_0x491d6f));break;}case 0x3:case 0x10e:{canvas['rotate'](-Math['PI']/0x2);canvas[_0xe10f('0x7')](parseInt(-_0x66b2d3-_0x5a8eba-_0x491d6f),parseInt(_0x66b2d3-_0x5a8eba));var _0x215551=_0x170720;_0x170720=_0x491d6f;_0x491d6f=_0x215551;break;}default:break;}barcodeWriter['barcode'](canvas,_0x234f94,_0x66b2d3,_0x5a8eba,_0x170720,_0x491d6f);canvas['restore']();}function drawQRCode(_0x4e31c4,_0x37f348,_0x56a18f,_0x598866,_0x1358a6){_0x37f348=covert(_0x37f348);_0x56a18f=covert(_0x56a18f);_0x598866=covert(_0x598866);_0x1358a6=covert(_0x1358a6);canvas[_0xe10f('0x26')]();switch(itemOrientation){case 0x1:case 0x5a:{canvas['rotate'](Math['PI']/0x2);canvas['translate'](parseInt(_0x56a18f-_0x37f348),parseInt(-_0x37f348-_0x56a18f-_0x598866));var _0x53e833=_0x598866;_0x598866=_0x1358a6;_0x1358a6=_0x53e833;break;}case 0x2:case 0xb4:{canvas[_0xe10f('0x23')](Math['PI']);canvas[_0xe10f('0x7')](parseInt(-_0x37f348*0x2-_0x598866),parseInt(-_0x56a18f*0x2-_0x1358a6));break;}case 0x3:case 0x10e:{canvas[_0xe10f('0x23')](-Math['PI']/0x2);canvas['translate'](parseInt(-_0x37f348-_0x56a18f-_0x1358a6),parseInt(_0x37f348-_0x56a18f));var _0x53e833=_0x598866;_0x598866=_0x1358a6;_0x1358a6=_0x53e833;break;}default:break;}barcodeWriter['qrcode'](canvas,_0x4e31c4,_0x37f348,_0x56a18f,_0x598866,_0x1358a6);canvas['restore']();}function drawLine(_0x33f6cd,_0x12b357,_0x36f0f2,_0x3f9557){drawRectangle(_0x33f6cd,_0x12b357,_0x36f0f2,_0x3f9557,0x0,!![]);}function drawRectangle(_0x8bbcad,_0x2af08f,_0x188f78,_0x30427c,_0x3c91c4,_0x5c8b5e){_0x8bbcad=covert(_0x8bbcad);_0x2af08f=covert(_0x2af08f);_0x188f78=covert(_0x188f78);_0x30427c=covert(_0x30427c);_0x3c91c4=covert(_0x3c91c4);canvas[_0xe10f('0x26')]();switch(itemOrientation){case 0x1:case 0x5a:{canvas['rotate'](Math['PI']/0x2);canvas[_0xe10f('0x7')](parseInt(_0x2af08f-_0x8bbcad),parseInt(-_0x8bbcad-_0x2af08f-_0x188f78));var _0x5d5e44=_0x188f78;_0x188f78=_0x30427c;_0x30427c=_0x5d5e44;break;}case 0x2:case 0xb4:{canvas[_0xe10f('0x23')](Math['PI']);canvas['translate'](parseInt(-_0x8bbcad*0x2-_0x188f78),parseInt(-_0x2af08f*0x2-_0x30427c));break;}case 0x3:case 0x10e:{canvas[_0xe10f('0x23')](-Math['PI']/0x2);canvas[_0xe10f('0x7')](parseInt(-_0x8bbcad-_0x2af08f-_0x30427c),parseInt(_0x8bbcad-_0x2af08f));var _0x5d5e44=_0x188f78;_0x188f78=_0x30427c;_0x30427c=_0x5d5e44;break;}default:break;}canvas[_0xe10f('0x18')](_0x3c91c4);if(_0x5c8b5e){canvas['setFillStyle'](_0xe10f('0xa'));canvas[_0xe10f('0x3')](_0x8bbcad,_0x2af08f,_0x188f78,_0x30427c);}else{canvas[_0xe10f('0x19')](_0x8bbcad,_0x2af08f,_0x188f78,_0x30427c);}canvas[_0xe10f('0x12')]();}module['exports']={'setPrintPageGapType':setPrintPageGapType,'setPrintPageGapLength':setPrintPageGapLength,'setPrintDarkness':setPrintDarkness,'setPrintSpeed':setPrintSpeed,'setSupportPrefixs':setSupportPrefixs,'connectingPrinterName':connectingPrinterName,'scanedPrinters':scanedPrinters,'openPrinter':openPrinter,'initLPAPI':initLPAPI,'connectingPrinterDetailInfos':connectingPrinterDetailInfos,'closePrinter':closePrinter,'startDrawLabel':startDrawLabel,'endDrawLabel':endDrawLabel,'print':print,'setItemOrientation':setItemOrientation,'setItemHorizontalAlignment':setItemHorizontalAlignment,'setItemVerticalAlignment':setItemVerticalAlignment,'drawText':drawText,'drawBarcode':drawBarcode,'drawQRCode':drawQRCode,'drawLine':drawLine,'drawRectangle':drawRectangle};