var _0x1db7 = ["\x2E\x2F\x44\x7A\x42\x4C\x45\x2E\x6A\x73", "\x2E\x2F\x42\x69\x74\x6D\x61\x70\x50\x61\x63\x6B\x61\x67\x65\x2E\x6A\x73", "\x2E\x2F\x42\x61\x72\x63\x6F\x64\x65\x57\x72\x69\x74\x65\x72\x2E\x6A\x73", "\x63\x75\x72\x72\x65\x6E\x74\x50\x72\x69\x6E\x74\x65\x72", "\x67\x6C\x6F\x62\x61\x6C\x44\x61\x74\x61", "\x44\x50\x49", "\x73\x65\x74\x53\x75\x70\x70\x6F\x72\x74\x50\x72\x65\x66\x69\x78\x73", "\x6E\x61\x6D\x65", "\x73\x74\x61\x72\x74\x53\x63\x61\x6E\x50\x65\x72\x69\x70\x68\x65\x72\x61\x6C\x73", "\x69\x6E\x69\x74\x42\x4C\x45", "\x6C\x65\x6E\x67\x74\x68", "\x52\x53\x53\x49", "\x73\x6F\x72\x74", "\x64\x65\x76\x69\x63\x65\x49\x64", "\x63\x6F\x6E\x6E\x65\x63\x74\x50\x65\x72\x69\x70\x68\x65\x72\x61\x6C", "\x73\x75\x62\x73\x74\x72\x69\x6E\x67", "\x74\x6F\x55\x70\x70\x65\x72\x43\x61\x73\x65", "\u6CA1\u6709\u53D1\u73B0\u6253\u5370\u673A", "", "\x73\x68\x6F\x77\x54\x6F\x61\x73\x74", "\x64\x69\x73\x63\x6F\x6E\x6E\x65\x63\x74\x50\x65\x72\x69\x70\x68\x65\x72\x61\x6C", "\x63\x72\x65\x61\x74\x65\x43\x61\x6E\x76\x61\x73\x43\x6F\x6E\x74\x65\x78\x74", "\u6CA1\u6709\u6B64\u753B\u5E03", "\x77\x69\x64\x74\x68", "\x68\x65\x69\x67\x68\x74", "\x63\x6C\x65\x61\x72\x52\x65\x63\x74", "\x64\x72\x61\x77", "\x73\x65\x74\x44\x61\x74\x61", "\x77\x68\x69\x74\x65", "\x73\x65\x74\x46\x69\x6C\x6C\x53\x74\x79\x6C\x65", "\x66\x69\x6C\x6C\x52\x65\x63\x74", "\x62\x6C\x61\x63\x6B", "\u6B63\u5728\u751F\u6210\u6807\u7B7E\u56FE\u7247", "\x6C\x6F\x61\x64\x69\x6E\x67", "\x68\x69\x64\x65\x54\x6F\x61\x73\x74", "\x63\x61\x6E\x76\x61\x73\x49\x64", "\x64\x61\x74\x61", "\x70\x75\x73\x68", "\x6C\x6F\x67", "\x63\x61\x6E\x76\x61\x73\x50\x75\x74\x49\x6D\x61\x67\x65\x44\x61\x74\x61", "\x63\x61\x6E\x76\x61\x73\x47\x65\x74\x49\x6D\x61\x67\x65\x44\x61\x74\x61", "\u6B63\u5728\u751F\u6210\u6253\u5370\u6570\u636E", "\u6807\u7B7E\u5BBD\u5EA6\uFF1A", "\u6807\u7B7E\u9AD8\u5EA6\uFF1A", "\x61\x72\x72\x61\x79\x57\x69\x74\x68\x49\x6D\x61\x67\x65", "\x73\x65\x6E\x64\x44\x61\x74\x61", "\x73\x65\x74\x46\x6F\x6E\x74\x53\x69\x7A\x65", "\x6C\x65\x66\x74", "\x73\x65\x74\x54\x65\x78\x74\x41\x6C\x69\x67\x6E", "\x63\x65\x6E\x74\x65\x72", "\x72\x69\x67\x68\x74", "\x66\x69\x6C\x6C\x54\x65\x78\x74", "\x73\x61\x76\x65", "\x50\x49", "\x72\x6F\x74\x61\x74\x65", "\x74\x72\x61\x6E\x73\x6C\x61\x74\x65", "\x62\x61\x72\x63\x6F\x64\x65", "\x72\x65\x73\x74\x6F\x72\x65", "\x71\x72\x63\x6F\x64\x65", "\x73\x65\x74\x4C\x69\x6E\x65\x57\x69\x64\x74\x68", "\x73\x74\x72\x6F\x6B\x65\x52\x65\x63\x74", "\x65\x78\x70\x6F\x72\x74\x73"];
var dzBLE = require(_0x1db7[0]);
var bitmapPackage = require(_0x1db7[1]);
var barcodeWriter = require(_0x1db7[2]);
var printWidth = 0;
var printHeight = 0;
var printOrientation = 0;
var itemOrientation = 0;
var itemHorizontalAlignment = 0;
var itemVerticalAlignment = 0;
var connectPrinterTimer;
var canConnect = true;
var printPageGapType = -1;
var printPageGapLength = 2.0;
var printDarkness = 0;
var printSpeed = 0;
var hasInit = false;
var canvas = null;
var canvasJS = null;
var filePath = null;

function covert(_0xeccex15) {
  _0xeccex15 = _0xeccex15 * DPI() / 25.4;
  _0xeccex15 = _0xeccex15 >= 0 ? _0xeccex15 + 0.1 : _0xeccex15 - 0.1;
  return parseInt(_0xeccex15)
}

function DPI() {
  var _0xeccex17 = 203;
  var _0xeccex18 = getApp()[_0x1db7[4]][_0x1db7[3]];
  _0xeccex17 = _0xeccex18[_0x1db7[5]];
  return _0xeccex17
}

function setPrintPageGapType(_0xeccex1a) {
  printPageGapType = _0xeccex1a
}

function setPrintPageGapLength(_0xeccex1c) {
  printPageGapLength = _0xeccex1c
}

function setPrintDarkness(_0xeccex1e) {
  printDarkness = _0xeccex1e
}

function setPrintSpeed(_0xeccex20) {
  printSpeed = _0xeccex20
}

function setSupportPrefixs(_0xeccex22) {
  dzBLE[_0x1db7[6]](_0xeccex22)
}

function connectingPrinterName() {
  var _0xeccex18 = getApp()[_0x1db7[4]][_0x1db7[3]];
  return _0xeccex18[_0x1db7[7]]
}

function initPrinterCenter(_0xeccex25) {
  if (hasInit) {
    dzBLE[_0x1db7[8]](function (_0xeccex26) {
      _0xeccex25(_0xeccex26)
    })
  } else {
    dzBLE[_0x1db7[9]](function (_0xeccex26) {
      hasInit = true;
      _0xeccex25(_0xeccex26)
    })
  }
}

function scanedPrinters(_0xeccex25) {
  initPrinterCenter(function (_0xeccex26) {
    _0xeccex25(_0xeccex26)
  })
}

function compare(_0xeccex29) {
  return function (_0xeccex2a, _0xeccex2b) {
    var _0xeccex2c = _0xeccex2a[_0xeccex29];
    var _0xeccex2d = _0xeccex2b[_0xeccex29];
    return _0xeccex2d - _0xeccex2c
  }
}

function openPrinter(_0xeccex2f) {
  initPrinterCenter(function (_0xeccex26) {
    if (_0xeccex26[_0x1db7[10]] > 0) {
      if (_0xeccex2f == null || _0xeccex2f[_0x1db7[10]] == 0) {
        _0xeccex26[_0x1db7[12]](compare(_0x1db7[11]));
        for (var _0xeccex30 = 0; _0xeccex30 < _0xeccex26[_0x1db7[10]]; _0xeccex30++) {
          var _0xeccex31 = _0xeccex26[_0xeccex30]
        };
        dzBLE[_0x1db7[14]](_0xeccex26[0][_0x1db7[13]])
      } else {
        for (var _0xeccex30 = 0; _0xeccex30 < _0xeccex26[_0x1db7[10]]; _0xeccex30++) {
          var _0xeccex31 = _0xeccex26[_0xeccex30];
          var _0xeccex32 = _0xeccex31[_0x1db7[7]][_0x1db7[15]](0, _0xeccex2f[_0x1db7[10]]);
          if ((_0xeccex32[_0x1db7[16]]()) == (_0xeccex2f[_0x1db7[16]]())) {
            dzBLE[_0x1db7[14]](_0xeccex31[_0x1db7[13]]);
            break
          }
        }
      }
    } else {
      wx[_0x1db7[19]]({
        title: _0x1db7[17],
        icon: _0x1db7[18],
        image: _0x1db7[18],
        duration: 2000,
        mask: true,
        success: function (_0xeccex33) {},
        fail: function (_0xeccex33) {},
        complete: function (_0xeccex33) {}
      })
    }
  })
}

function connectingPrinterDetailInfos() {
  var _0xeccex18 = getApp()[_0x1db7[4]][_0x1db7[3]];
  return _0xeccex18
}

function closePrinter() {
  dzBLE[_0x1db7[20]]()
}

function startDrawLabel(_0xeccex37, _0xeccex38, _0xeccex39, _0xeccex3a, _0xeccex3b) {
  canvas = wx[_0x1db7[21]](_0xeccex37);
  if (canvas == null) {
    wx[_0x1db7[19]]({
      title: _0x1db7[22],
      icon: _0x1db7[18],
      image: _0x1db7[18],
      duration: 2000,
      mask: true,
      success: function (_0xeccex33) {},
      fail: function (_0xeccex33) {},
      complete: function (_0xeccex33) {}
    })
  } else {
    printOrientation = _0xeccex3b;
    printWidth = covert(_0xeccex39);
    printHeight = covert(_0xeccex3a);
    itemOrientation = 0;
    itemHorizontalAlignment = 0;
    itemVerticalAlignment = 0;
    canvasJS = _0xeccex38;
    canvas[_0x1db7[25]](0, 0, canvas[_0x1db7[23]], canvas[_0x1db7[24]]);
    canvas[_0x1db7[26]]();
    canvasJS[_0x1db7[27]]({
      canvasWidth: printWidth,
      canvasHeight: printHeight
    });
    canvas[_0x1db7[29]](_0x1db7[28]);
    canvas[_0x1db7[30]](0, 0, printWidth + 5, printHeight + 5);
    canvas[_0x1db7[29]](_0x1db7[31])
  }
}

function endDrawLabel() {
  canvas[_0x1db7[26]]();
  wx[_0x1db7[19]]({
    title: _0x1db7[32],
    icon: _0x1db7[33],
    image: _0x1db7[18],
    duration: 10000,
    mask: true,
    success: function (_0xeccex33) {},
    fail: function (_0xeccex33) {},
    complete: function (_0xeccex33) {}
  });
  if (printOrientation == 0) {
    wx[_0x1db7[34]]()
  } else {
    wx[_0x1db7[40]]({
      canvasId: canvas[_0x1db7[35]],
      x: 0,
      y: 0,
      width: printWidth,
      height: printHeight,
      success: function (_0xeccex33) {
        var _0xeccex3d = _0xeccex33[_0x1db7[36]];
        var _0xeccex3e = new Array();
        if (printOrientation == 90) {
          for (var _0xeccex3f = printWidth - 1; _0xeccex3f >= 0; _0xeccex3f--) {
            for (var _0xeccex40 = 0; _0xeccex40 < printHeight; _0xeccex40++) {
              var _0xeccex41 = ((printWidth * _0xeccex40) + _0xeccex3f) * 4;
              _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 0]);
              _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 1]);
              _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 2]);
              _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 3])
            }
          };
          var _0xeccex42 = printWidth;
          printWidth = printHeight;
          printHeight = _0xeccex42
        } else {
          if (printOrientation == 180) {
            for (var _0xeccex40 = printHeight - 1; _0xeccex40 >= 0; _0xeccex40--) {
              for (var _0xeccex3f = printWidth - 1; _0xeccex3f >= 0; _0xeccex3f--) {
                var _0xeccex41 = ((printWidth * _0xeccex40) + _0xeccex3f) * 4;
                _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 0]);
                _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 1]);
                _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 2]);
                _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 3])
              }
            }
          } else {
            if (printOrientation == 270) {
              for (var _0xeccex3f = 0; _0xeccex3f < printWidth; _0xeccex3f++) {
                for (var _0xeccex40 = printHeight - 1; _0xeccex40 >= 0; _0xeccex40--) {
                  var _0xeccex41 = ((printWidth * _0xeccex40) + _0xeccex3f) * 4;
                  _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 0]);
                  _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 1]);
                  _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 2]);
                  _0xeccex3e[_0x1db7[37]](_0xeccex3d[_0xeccex41 + 3])
                }
              };
              var _0xeccex42 = printWidth;
              printWidth = printHeight;
              printHeight = _0xeccex42
            }
          }
        };
        canvasJS[_0x1db7[27]]({
          canvasWidth: printWidth,
          canvasHeight: printHeight
        });
        var _0xeccex43 = new Uint8ClampedArray(_0xeccex3e);
        wx[_0x1db7[39]]({
          canvasId: canvas[_0x1db7[35]],
          data: _0xeccex43,
          x: 0,
          y: 0,
          width: printWidth,
          height: printHeight,
          success: function (_0xeccex33) {
            wx[_0x1db7[34]]()
          },
          fail: function (_0xeccex33) {
            console[_0x1db7[38]](_0xeccex33)
          }
        })
      }
    })
  }
}

function print() {
  wx[_0x1db7[19]]({
    title: _0x1db7[41],
    icon: _0x1db7[33],
    image: _0x1db7[18],
    duration: 10000,
    mask: true,
    success: function (_0xeccex33) {},
    fail: function (_0xeccex33) {},
    complete: function (_0xeccex33) {}
  });
  wx[_0x1db7[40]]({
    canvasId: canvas[_0x1db7[35]],
    x: 0,
    y: 0,
    width: printWidth,
    height: printHeight,
    success: function (_0xeccex33) {
      console[_0x1db7[38]](_0x1db7[42] + _0xeccex33[_0x1db7[23]]);
      console[_0x1db7[38]](_0x1db7[43] + _0xeccex33[_0x1db7[24]]);
      var _0xeccex45 = bitmapPackage[_0x1db7[44]](_0xeccex33[_0x1db7[36]], _0xeccex33[_0x1db7[23]], _0xeccex33[_0x1db7[24]], printPageGapType, printPageGapLength * 100, printDarkness, printSpeed, false);
      wx[_0x1db7[34]]();
      dzBLE[_0x1db7[45]](_0xeccex45)
    }
  })
}

function setItemOrientation(_0xeccex3b) {
  if (_0xeccex3b != 0 && _0xeccex3b != 90 && _0xeccex3b != 180 && _0xeccex3b != 270) {
    return
  };
  itemOrientation = _0xeccex3b
}

function setItemHorizontalAlignment(_0xeccex48) {
  if (_0xeccex48 != 0 && _0xeccex48 != 1 && _0xeccex48 != 2) {
    return
  };
  itemHorizontalAlignment = _0xeccex48
}

function setItemVerticalAlignment(_0xeccex48) {
  if (_0xeccex48 != 0 && _0xeccex48 != 1 && _0xeccex48 != 2) {
    return
  };
  itemVerticalAlignment = _0xeccex48
}

function drawText(_0xeccex4b, _0xeccex4c, _0xeccex4d, _0xeccex4e) {
  canvas[_0x1db7[46]](covert(_0xeccex4e));
  switch (itemHorizontalAlignment) {
    case 0: {
      canvas[_0x1db7[48]](_0x1db7[47]);
      break
    };
  case 1: {
    canvas[_0x1db7[48]](_0x1db7[49]);
    break
  };
  case 2: {
    canvas[_0x1db7[48]](_0x1db7[50]);
    break
  };
  default:
    break
  };
  canvas[_0x1db7[51]](_0xeccex4b, covert(_0xeccex4c), covert(_0xeccex4d))
}

function drawBarcode(_0xeccex4b, _0xeccex4c, _0xeccex4d, _0xeccex39, _0xeccex3a) {
  _0xeccex4c = covert(_0xeccex4c);
  _0xeccex4d = covert(_0xeccex4d);
  _0xeccex39 = covert(_0xeccex39);
  _0xeccex3a = covert(_0xeccex3a);
  canvas[_0x1db7[52]]();
  switch (itemOrientation) {
    case 1:
      ;
    case 90: {
      canvas[_0x1db7[54]](Math[_0x1db7[53]] / 2);
      canvas[_0x1db7[55]](parseInt(_0xeccex4d - _0xeccex4c), parseInt(-_0xeccex4c - _0xeccex4d - _0xeccex39));
      var _0xeccex42 = _0xeccex39;
      _0xeccex39 = _0xeccex3a;
      _0xeccex3a = _0xeccex42;
      break
    };
  case 2:
    ;
  case 180: {
    canvas[_0x1db7[54]](Math.PI);
    canvas[_0x1db7[55]](parseInt(-_0xeccex4c * 2 - _0xeccex39), parseInt(-_0xeccex4d * 2 - _0xeccex3a));
    break
  };
  case 3:
    ;
  case 270: {
    canvas[_0x1db7[54]](-Math[_0x1db7[53]] / 2);
    canvas[_0x1db7[55]](parseInt(-_0xeccex4c - _0xeccex4d - _0xeccex3a), parseInt(_0xeccex4c - _0xeccex4d));
    var _0xeccex42 = _0xeccex39;
    _0xeccex39 = _0xeccex3a;
    _0xeccex3a = _0xeccex42;
    break
  };
  default:
    break
  };
  barcodeWriter[_0x1db7[56]](canvas, _0xeccex4b, _0xeccex4c, _0xeccex4d, _0xeccex39, _0xeccex3a);
  canvas[_0x1db7[57]]()
}

function drawQRCode(_0xeccex4b, _0xeccex4c, _0xeccex4d, _0xeccex39, _0xeccex3a) {
  _0xeccex4c = covert(_0xeccex4c);
  _0xeccex4d = covert(_0xeccex4d);
  _0xeccex39 = covert(_0xeccex39);
  _0xeccex3a = covert(_0xeccex3a);
  canvas[_0x1db7[52]]();
  switch (itemOrientation) {
    case 1:
      ;
    case 90: {
      canvas[_0x1db7[54]](Math[_0x1db7[53]] / 2);
      canvas[_0x1db7[55]](parseInt(_0xeccex4d - _0xeccex4c), parseInt(-_0xeccex4c - _0xeccex4d - _0xeccex39));
      var _0xeccex42 = _0xeccex39;
      _0xeccex39 = _0xeccex3a;
      _0xeccex3a = _0xeccex42;
      break
    };
  case 2:
    ;
  case 180: {
    canvas[_0x1db7[54]](Math.PI);
    canvas[_0x1db7[55]](parseInt(-_0xeccex4c * 2 - _0xeccex39), parseInt(-_0xeccex4d * 2 - _0xeccex3a));
    break
  };
  case 3:
    ;
  case 270: {
    canvas[_0x1db7[54]](-Math[_0x1db7[53]] / 2);
    canvas[_0x1db7[55]](parseInt(-_0xeccex4c - _0xeccex4d - _0xeccex3a), parseInt(_0xeccex4c - _0xeccex4d));
    var _0xeccex42 = _0xeccex39;
    _0xeccex39 = _0xeccex3a;
    _0xeccex3a = _0xeccex42;
    break
  };
  default:
    break
  };
  barcodeWriter[_0x1db7[58]](canvas, _0xeccex4b, _0xeccex4c, _0xeccex4d, _0xeccex39, _0xeccex3a);
  canvas[_0x1db7[57]]()
}

function drawLine(_0xeccex4c, _0xeccex4d, _0xeccex39, _0xeccex3a) {
  drawRectangle(_0xeccex4c, _0xeccex4d, _0xeccex39, _0xeccex3a, 0, true)
}

function drawRectangle(_0xeccex4c, _0xeccex4d, _0xeccex39, _0xeccex3a, _0xeccex53, _0xeccex54) {
  _0xeccex4c = covert(_0xeccex4c);
  _0xeccex4d = covert(_0xeccex4d);
  _0xeccex39 = covert(_0xeccex39);
  _0xeccex3a = covert(_0xeccex3a);
  _0xeccex53 = covert(_0xeccex53);
  canvas[_0x1db7[52]]();
  switch (itemOrientation) {
    case 1:
      ;
    case 90: {
      canvas[_0x1db7[54]](Math[_0x1db7[53]] / 2);
      canvas[_0x1db7[55]](parseInt(_0xeccex4d - _0xeccex4c), parseInt(-_0xeccex4c - _0xeccex4d - _0xeccex39));
      var _0xeccex42 = _0xeccex39;
      _0xeccex39 = _0xeccex3a;
      _0xeccex3a = _0xeccex42;
      break
    };
  case 2:
    ;
  case 180: {
    canvas[_0x1db7[54]](Math.PI);
    canvas[_0x1db7[55]](parseInt(-_0xeccex4c * 2 - _0xeccex39), parseInt(-_0xeccex4d * 2 - _0xeccex3a));
    break
  };
  case 3:
    ;
  case 270: {
    canvas[_0x1db7[54]](-Math[_0x1db7[53]] / 2);
    canvas[_0x1db7[55]](parseInt(-_0xeccex4c - _0xeccex4d - _0xeccex3a), parseInt(_0xeccex4c - _0xeccex4d));
    var _0xeccex42 = _0xeccex39;
    _0xeccex39 = _0xeccex3a;
    _0xeccex3a = _0xeccex42;
    break
  };
  default:
    break
  };
  canvas[_0x1db7[59]](_0xeccex53);
  if (_0xeccex54) {
    canvas[_0x1db7[29]](_0x1db7[31]);
    canvas[_0x1db7[30]](_0xeccex4c, _0xeccex4d, _0xeccex39, _0xeccex3a)
  } else {
    canvas[_0x1db7[60]](_0xeccex4c, _0xeccex4d, _0xeccex39, _0xeccex3a)
  };
  canvas[_0x1db7[57]]()
}
module[_0x1db7[61]] = {
  setPrintPageGapType: setPrintPageGapType,
  setPrintPageGapLength: setPrintPageGapLength,
  setPrintDarkness: setPrintDarkness,
  setPrintSpeed: setPrintSpeed,
  setSupportPrefixs: setSupportPrefixs,
  connectingPrinterName: connectingPrinterName,
  scanedPrinters: scanedPrinters,
  openPrinter: openPrinter,
  connectingPrinterDetailInfos: connectingPrinterDetailInfos,
  closePrinter: closePrinter,
  startDrawLabel: startDrawLabel,
  endDrawLabel: endDrawLabel,
  print: print,
  setItemOrientation: setItemOrientation,
  setItemHorizontalAlignment: setItemHorizontalAlignment,
  setItemVerticalAlignment: setItemVerticalAlignment,
  drawText: drawText,
  drawBarcode: drawBarcode,
  drawQRCode: drawQRCode,
  drawLine: drawLine,
  drawRectangle: drawRectangle
}