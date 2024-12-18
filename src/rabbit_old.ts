
const data = require('./decodedpng.js');
const crypto = require('crypto');
const cryptoJs = require('crypto-js');
const user_agent = "Mozilla/5.0 (X11; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0";

const main = async (provider, xrax) => {

  let wasm: any;
  let arr = new Array(128).fill(void 0);
  const dateNow = Date.now();
  let content: string;
  //let buffer: any;

  const dataURL = "data:image/png;base64,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"
  
  const embed_url = provider == "rabbit" ? "https://venusembed.site/v2/embed-4/" : "https://megacloud.tube/embed-1/e-1/";
  const referrer = provider == "rabbit" ? "https://flixhq.to/" : "https://hdobox.se/";

  const meta = {
    content: content
  }
  
  const image_data = {
    height: 50,
    width: 65,
    data: data.data,
  }

  interface fakeLocalStorage {
    [key: string]: string | Function
    setItem: Function
  }

  interface fakeWindow {
    localStorage: fakeLocalStorage
    [key: string]: any
  }

  const canvas = {
    baseUrl: provider == "rabbit" ? "https://venusembed.site/v2/embed-4/XeowwQ5tzMP4?z=" : "https://megacloud.tube/embed-1/e-1/POg3BzgJJ55W?z=",
    width: 0,
    height: 0,
    style: {
      style: {
        display: "inline",
      },
    }
  }

  const fake_window: fakeWindow = {
    
    localStorage: {
      setItem: function(item: string, value: string) {
        fake_window.localStorage[item] = value;
      }
    },
    navigator: {
      webdriver: false,
      userAgent: user_agent,
    },
    length: 0,
    document: {
      cookie: "",
    },
    origin: provider == "rabbit" ? "https://venusembed.site" : "https://megacloud.tube",
    location: {
      href: provider == "rabbit" ? "https://venusembed.site/v2/embed-4/xx2fwredOZnX?z=" : "https://megacloud.tube/embed-1/e-1/POg3BzgJJ55W?z=",
      origin: provider == "rabbit" ? "https://venusembed.site" : "https://megacloud.tube",
    },
    performance: {
      timeOrigin: dateNow,
    },
    xrax: ''
  };

  const nodeList = {
    image: {
      src: provider == "rabbit" ?  "https://venusembed.site/images/image.png?v=0.1.0" : "https://megacloud.tube/images/image.png?v=0.0.9",
      height: 50,
      width: 65,
      complete: true,
    },
    context2d: {},
    length: 1,
  }


  //let script_url = provider == "rabbit" ? "https://venusembed.site/v2/embed-4/mcAWNPptFcOb?z=" : "https://megacloud.tv/embed-1/e-1/POg3BzgJJ55W?z=";

  function get(index: number) {
    return arr[index];
  }

  arr.push(void 0, null, true, false);

  let size = 0;
  let memoryBuff: Uint8Array | null;

  //fix this
  function getMemBuff(): Uint8Array {
    return memoryBuff = null !== memoryBuff && 0 !== memoryBuff.byteLength ? memoryBuff : new Uint8Array(wasm.memory.buffer);
  }

  const encoder = new TextEncoder();
  const encode = function(text: string, array: Uint8Array) {
    return encoder.encodeInto(text, array)
  }

  function parse(text: string, func: Function, func2: Function) {
    if (void 0 === func2) {
      var encoded = encoder.encode(text);
      const parsedIndex = func(encoded.length, 1) >>> 0;
      return getMemBuff().subarray(parsedIndex, parsedIndex + encoded.length).set(encoded), size = encoded.length, parsedIndex;
    }
    let len = text.length;
    let parsedLen = func(len, 1) >>> 0;
    var new_arr = getMemBuff();
    let i = 0;
    for (; i < len; i++) {
      var char = text.charCodeAt(i);
      if (127 < char) {
        break;
      }
      new_arr[parsedLen + i] = char;
    }
    return i !== len && (0 !== i && (text = text.slice(i)), parsedLen = func2(parsedLen, len, len = i + 3 * text.length, 1) >>> 0, encoded = getMemBuff().subarray(parsedLen + i, parsedLen + len), i += encode(text, encoded).written, parsedLen = func2(parsedLen, len, i, 1) >>> 0), size = i, parsedLen;
  }


  let arr32: Int32Array | null;
  let arr64: Float64Array | null;

  function isNull(test: any) {
    return null == test;
  }

  function getArr32() {
    return arr32 = null !== arr32 && 0 !== arr32.byteLength ? arr32 : new Int32Array(wasm.memory.buffer);
  }

  function getArr64() {
    return arr64 = null !== arr64 && 0 !== arr64.byteLength ? arr64 : new Float64Array(wasm.memory.buffer);
  }

  let pointer = arr.length;

  function shift(QP: number) {
    QP < 132 || (arr[QP] = pointer, pointer = QP);
  }

  function shiftGet(QP: number) {
    var Qn = get(QP);
    return shift(QP), Qn;
  }

  const decoder = new TextDecoder("utf-8", {
    fatal: true,
    ignoreBOM: true,
  });

  function decodeSub(index: number, offset: number) {
    return index >>>= 0, decoder.decode(getMemBuff().subarray(index, index + offset));
  }

  function addToStack(item: any) {
    pointer === arr.length && arr.push(arr.length + 1);
    var Qn = pointer;
    return pointer = arr[Qn], arr[Qn] = item, Qn;
  }

  function args(QP: any, Qn: number, QT: number, func: Function) {
    const Qx = {
      'a': QP,
      'b': Qn,
      'cnt': 1,
      'dtor': QT
    }
    return QP = (...Qw: any) => {
      Qx.cnt++;
      try {
        return func(Qx.a, Qx.b, ...Qw);
      } finally {
        0 == --Qx.cnt && (wasm.__wbindgen_export_2.get(Qx.dtor)(Qx.a, Qx.b), Qx.a = 0);
      }
    }, (QP.original = Qx, QP);
  }

  function export3(QP: any, Qn: any) {
    wasm.__wbindgen_export_3(QP, Qn);
  }

  function export4(QP: any, Qn: any) {
    return shiftGet(wasm.__wbindgen_export_4(QP, Qn));
  }

  function export5(QP: any, Qn: any, QT: any) {
    wasm.__wbindgen_export_5(QP, Qn, addToStack(QT));
  }

  function applyToWindow(func: Function, args: ArrayLike<Object>) {
    try {
      return func.apply(fake_window, args);
    } catch (error) {
      wasm.__wbindgen_export_6(addToStack(error));
    }
  }

  function Qj(QP: ArrayLike<number>, Qn: any) {
    return Qn = Qn(+QP.length, 1) >>> 0, (getMemBuff().set(QP, Qn), size = QP.length, Qn);
  }

  async function QN(QP: Response, Qn: WebAssembly.Imports) {
    let QT: ArrayBuffer, Qt: any;
    return 'function' == typeof Response && QP instanceof Response ? (QT = await QP.arrayBuffer(), Qt = await WebAssembly.instantiate(QT, Qn), Object.assign(Qt, { 'bytes': QT })) : (Qt = await WebAssembly.instantiate(QP, Qn)) instanceof WebAssembly.Instance ? {
      'instance': Qt,
      'module': QP
    } : Qt;
  }

  function initWasm() {
    const wasmObj = {
      'wbg': {
        '__wbindgen_string_get': function(offset: number, index: number) {
          let str = get(index);
          let val = parse(str, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
          getArr32()[offset / 4 + 1] = size;
          getArr32()[offset / 4 + 0] = val;
        },
        '__wbindgen_object_drop_ref': function(index: number) {
          shiftGet(index);
        },
        '__wbindgen_cb_drop': function(index: number) {
          let org = shiftGet(index).original;
          return 1 == org.cnt-- && !(org.a = 0);

        },
        '__wbindgen_string_new': function(index: number, offset: number) {
          return addToStack(decodeSub(index, offset));
        },
        '__wbindgen_is_null': function(index: number) {
          return null === get(index);
        },
        '__wbindgen_is_undefined': function(index: number) {
          return void 0 === get(index);
        },
        '__wbindgen_boolean_get': function(index: number) {
          let bool = get(index);
          return 'boolean' == typeof bool ? bool ? 1 : 0 : 2;
        },
        '__wbindgen_number_get': function(offset: number, index: number) {
          let obj = get(index);
          if (typeof obj === 'number') {
            getArr32()[offset / 4] = 1;
            getArr32()[(offset / 4) + 1] = obj;
          } else {
            getArr32()[offset / 4] = 0;
          }
        },
        '__wbg_instanceof_CanvasRenderingContext2d_4ec30ddd3f29f8f9': function() {
          return true;
        },
        '__wbg_setfillStyle_59f426135f52910f': function() { },
        '__wbg_setshadowBlur_229c56539d02f401': function() { },
        '__wbg_setshadowColor_340d5290cdc4ae9d': function() { },
        '__wbg_setfont_16d6e31e06a420a5': function() { },
        '__wbg_settextBaseline_c3266d3bd4a6695c': function() { },
        '__wbg_drawImage_cb13768a1bdc04bd': function() { },
        '__wbg_getImageData_66269d289f37d3c7': function() {
          return applyToWindow(function() {
            return addToStack(image_data);
          }, arguments);
        },
        '__wbg_rect_2fa1df87ef638738': function() { },
        '__wbg_fillRect_4dd28e628381d240': function() { },
        '__wbg_fillText_07e5da9e41652f20': function() { },
        '__wbg_setProperty_5144ddce66bbde41': function() { },
        '__wbg_createElement_03cf347ddad1c8c0': function() {
          return applyToWindow(function(index, decodeIndex: number, decodeIndexOffset: number) {
            return addToStack(canvas);
          }, arguments);
        },
        '__wbg_querySelector_118a0639aa1f51cd': function() {
          return applyToWindow(function(index: number, decodeIndex: number, decodeOffset: number) {
            //let item = get(index).querySelector(decodeSub(decodeIndex, decodeOffset));
            //return isNull(item) ? 0 : addToStack(item);
            return addToStack(meta);
          }, arguments);
        },
        '__wbg_querySelectorAll_50c79cd4f7573825': function() {
          return applyToWindow(function() {
            return addToStack(nodeList);
          }, arguments);
        },
        '__wbg_getAttribute_706ae88bd37410fa': function(offset: number, index: number, decodeIndex: number, decodeOffset: number) {
          //let attr = get(index).getAttribute(decodeSub(decodeIndex, decodeOffset));
	        let attr = meta.content;
          //todo!
          let todo = isNull(attr) ? 0 : parse(attr, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
          getArr32()[offset / 4 + 1] = size;
          getArr32()[offset / 4 + 0] = todo;
        },
        '__wbg_target_6795373f170fd786': function(index: number) {
          let target = get(index).target
          return isNull(target) ? 0 : addToStack(target);
        },
        '__wbg_addEventListener_f984e99465a6a7f4': function() { },
        '__wbg_instanceof_HtmlCanvasElement_1e81f71f630e46bc': function() {
          return true;
        },
        '__wbg_setwidth_233645b297bb3318': function(index: number, set: number) {
          get(index).width = set >>> 0;
        },
        '__wbg_setheight_fcb491cf54e3527c': function(index: number, set: number) {
          get(index).height = set >>> 0;
        },
        '__wbg_getContext_dfc91ab0837db1d1': function() {
          return applyToWindow(function(index: number) {
            return addToStack(get(index).context2d);
          }, arguments);
        },
        '__wbg_toDataURL_97b108dd1a4b7454': function() {
          return applyToWindow(function(offset: number) {
            let _dataUrl = parse(dataURL, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            getArr32()[offset / 4 + 1] = size;
            getArr32()[offset / 4 + 0] = _dataUrl;
          }, arguments);
        },
        '__wbg_instanceof_HtmlDocument_1100f8a983ca79f9': function() {
          return true;
        },
        '__wbg_cookie_0ad89e781441fb95': function() {
          return applyToWindow(function(offset: number, index: number) {
            let _cookie = parse(get(index).cookie, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            getArr32()[offset / 4 + 1] = size;
            getArr32()[offset / 4 + 0] = _cookie;
          }, arguments);
        },
        '__wbg_style_ca229e3326b3c3fb': function(index: number) {
          addToStack(get(index).style);
        },
        '__wbg_instanceof_HtmlImageElement_9c82d4e3651a8533': function() {
          return true;
        },
        '__wbg_src_87a0e38af6229364': function(offset: number, index: number) {
          let _src = parse(get(index).src, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
          getArr32()[offset / 4 + 1] = size;
          getArr32()[offset / 4 + 0] = _src;
        },
        '__wbg_width_e1a38bdd483e1283': function(index: number) {
          return get(index).width;
        },
        '__wbg_height_e4cc2294187313c9': function(index: number) {
          return get(index).height;
        },
        '__wbg_complete_1162c2697406af11': function(index: number) {
          return get(index).complete;
        },
        '__wbg_data_d34dc554f90b8652': function(offset: number, index: number) {
          var _data = Qj(get(index).data, wasm.__wbindgen_export_0);
          getArr32()[offset / 4 + 1] = size;
          getArr32()[offset / 4 + 0] = _data;
        },
        '__wbg_origin_305402044aa148ce': function() {
          return applyToWindow(function(offset: number, index: number) {
            let _origin = parse(get(index).origin, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            getArr32()[offset / 4 + 1] = size;
            getArr32()[offset / 4 + 0] = _origin;
          }, arguments)
        },
        '__wbg_length_8a9352f7b7360c37': function(index: number) {
          return get(index).length;
        },
        '__wbg_get_c30ae0782d86747f': function(index: number) {
          let _image = get(index).image;
          return isNull(_image) ? 0 : addToStack(_image);
        },
        '__wbg_timeOrigin_f462952854d802ec': function(index: number) {
          return get(index).timeOrigin;
        },
        '__wbg_instanceof_Window_cee7a886d55e7df5': function() {
          return true
        },
        '__wbg_document_eb7fd66bde3ee213': function(index: number) {
          let _document = get(index).document;
          return isNull(_document) ? 0 : addToStack(_document);
        },
        '__wbg_location_b17760ac7977a47a': function(index: number) {
          return addToStack(get(index).location);
        },
        '__wbg_localStorage_3d538af21ea07fcc': function(index: number) {
          return addToStack(fake_window.localStorage);
        },
        '__wbg_performance_4ca1873776fdb3d2': function(index: number) {
          let _performance = get(index).performance;
          return isNull(_performance) ? 0 : addToStack(_performance);
        },
        '__wbg_origin_e1f8acdeb3a39a2b': function(offset: number, index: number) {
          let _origin = parse(get(index).origin, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
          getArr32()[offset / 4 + 1] = size;
          getArr32()[offset / 4 + 0] = _origin;
        },
        '__wbg_get_8986951b1ee310e0': function(index: number) {
          let _xrax = get(index).xrax;
          return isNull(_xrax) ? 0 : addToStack(_xrax);
        },
        '__wbg_setTimeout_6ed7182ebad5d297': function() {
          return applyToWindow(function() {
            return 10;
          }, arguments)
        },
        '__wbindgen_is_object': function(index: number) {
          let val = get(index);
          let ret = typeof val === 'object' && val !== null;
          return ret;
        },
        '__wbg_crypto_1d1f22824a6a080c': function (index: number) { 
          return addToStack(get(index).crypto); 
        },
        '__wbg_process_4a72847cc503995b': function (index: number) { 
            return addToStack(get(index).process);
        },
        '__wbg_versions_f686565e586dd935': function (index: number) {
            return addToStack(get(index).versions);
        },
        '__wbg_node_104a2ff8d6ea03a2': function(index: number) {
          return addToStack(get(index).node);
        },
        '__wbindgen_is_string': function(index: number) {
          return typeof get(index) == "string";
        },
        '__wbg_require_cca90b1a94a0255b': function() {
          return applyToWindow(function() {
            return addToStack(module.require);
          }, arguments);
        },
        '__wbg_msCrypto_eb05e62b530a1508': function() {},
        '__wbg_randomFillSync_5c9c955aa56b6049': function() {
          return applyToWindow(function(index: number, offset: number) {
            get(index).randomFillSync(get(offset));
          }, arguments);
        },
        '__wbg_getRandomValues_3aa56aa6edec874c': function() {
          return applyToWindow(function(index: number, offset: number) {
            get(index).getRandomValues(get(offset));
          }, arguments);
        },
        '__wbindgen_is_function': function(index: number) {
          return typeof get(index) == "function";
        },
        '__wbg_self_05040bd9523805b9': function() {
          return applyToWindow(function() {
            return addToStack(fake_window);
          }, arguments);
        },
        '__wbg_window_adc720039f2cb14f': function() {
          return applyToWindow(function() {
            return addToStack(fake_window);
          }, arguments);
        },
        '__wbg_globalThis_622105db80c1457d': function() {
          return applyToWindow(function() {
            return addToStack(fake_window);
          }, arguments)
        },
        '__wbg_global_f56b013ed9bcf359': function() {
          return applyToWindow(function() {
            return addToStack(fake_window);
          }, arguments)
        },
        '__wbg_newnoargs_cfecb3965268594c': function(index: number, offset: number) {
          return addToStack(new Function(decodeSub(index, offset)));
        },
        '__wbindgen_object_clone_ref': function(index: number) {
          return addToStack(get(index));
        },
        '__wbg_eval_c824e170787ad184': function() {
          return applyToWindow(function(index: number, offset: number) {
            let fake_str = "fake_" + decodeSub(index, offset);
            let ev = eval(fake_str);
            return addToStack(ev);
          }, arguments)
        },
        '__wbg_call_3f093dd26d5569f8': function() {
          return applyToWindow(function(index: number, index2: number) {
            return addToStack(get(index).call(get(index2)));
          }, arguments);
        },
        '__wbg_call_67f2111acd2dfdb6': function() {
          return applyToWindow(function(index: number, index2: number, index3: number) {
            return addToStack(get(index).call(get(index2), get(index3)));
          }, arguments);
        },
        '__wbg_toString_6eb7c1f755c00453': function(index: number) {
          return addToStack(get(index).toString());
        },
        '__wbg_set_961700853a212a39': function() {
          return applyToWindow(function(index: number, index2: number, index3: number) {
            return Reflect.set(get(index), get(index2), get(index3));
          }, arguments);
        },
        '__wbg_buffer_b914fb8b50ebbc3e': function(index: number) {
          return addToStack(get(index).buffer);
        },
        '__wbg_toString_139023ab33acec36': function(index: number) {
          return addToStack(get(index).toString());
        },
        '__wbg_newwithbyteoffsetandlength_0de9ee56e9f6ee6e': function(index: number, val: number, val2: number) {
          return addToStack(new Uint8Array(get(index), val >>> 0, val2 >>> 0));
        },
        '__wbg_new_b1f2d6842d615181': function(index: number) {
          return addToStack(new Uint8Array(get(index)));
        },
        '__wbg_newwithlength_0d03cef43b68a530': function(index: number, val: number, val2: number) {
          return addToStack(new Uint8Array(get(index), val >>> 0, val2 >>> 0));
        },
        '__wbg_buffer_67e624f5a0ab2319': function(index: number) {
          return addToStack(get(index).buffer);
        },
        '__wbg_subarray_adc418253d76e2f1': function(index: number, val: number, val2: number) {
          return addToStack(get(index).subarray(val >>> 0, val2 >>> 0));
        },
        '__wbg_length_21c4b0ae73cba59d': function(index: number) {
          return get(index).length;
        },
        '__wbg_set_7d988c98e6ced92d': function(index: number, index2: number, val: number) {
          get(index).set(get(index2), val >>> 0);
        },
        '__wbindgen_debug_string': function() { },
        '__wbindgen_throw': function(index: number, offset: number) {
          throw new Error(decodeSub(index, offset));
        },
        '__wbindgen_memory': function() {
          return addToStack(wasm.memory);
        },
        '__wbindgen_closure_wrapper117': function(Qn: any, QT: any) {
          return addToStack(args(Qn, QT, 2, export3));
        },
        '__wbindgen_closure_wrapper119': function(Qn: any, QT: any) {
          return addToStack(args(Qn, QT, 2, export4));
        },
        '__wbindgen_closure_wrapper121': function(Qn: any, QT: any) {
          return addToStack(args(Qn, QT, 2, export5));
        },
        '__wbindgen_closure_wrapper123': function(Qn: any, QT: any) {
          return addToStack(args(Qn, QT, 9, export4));
        },
      }
    }
    return wasmObj;
  }

  function assignWasm(resp: any) {
    wasm = resp.exports;
    arr32 = null, memoryBuff = null, wasm;
  }

  function QZ(QP: any) {
    let Qn: any;
    return void 0 !== wasm ? wasm : (Qn = initWasm(), QP instanceof WebAssembly.Module || (QP = new WebAssembly.Module(QP)), assignWasm(new WebAssembly.Instance(QP, Qn)));
  }


  // todo!
  async function loadWasm(url: any) {
    let mod: any, buffer: any;
    return void 0 !== wasm ? wasm : (mod = initWasm(), {
      instance: url,
      module: mod,
      bytes: buffer
    } = (url = fetch(url, {
      "headers": {
        "User-Agent": user_agent,
        "Referer": referrer,
      }
    }), void 0, await QN(await url, mod)), assignWasm(url), buffer);
  }

  const greetLoader = {
    groot: function() {
      wasm.groot();
    }
  }

  let wasmLoader = Object.assign(loadWasm, { 'initSync': QZ }, greetLoader);

  const Z = (z: string, Q0: string) => {
    try {
      var Q1 = cryptoJs.AES.decrypt(z, Q0);
      return JSON.parse(Q1.toString(cryptoJs.enc.Utf8));
    } catch (Q2: any) {
    }
    return [];
  }

  const R = (z: Uint8Array, Q0: Array<number>) => {
    try {
      for (let Q1 = 0; Q1 < z.length; Q1++) {
        z[Q1] = z[Q1] ^ Q0[Q1 % Q0.length];
      }
    } catch (Q2) {
      return null;
    }
  }


  function r(z: number) {
    return [
      (4278190080 & z) >> 24,
      (16711680 & z) >> 16,
      (65280 & z) >> 8,
      255 & z
    ];
  }

  const V = async () => {
    let wsm = provider == "rabbit" ? "https://venusembed.site/images/loading.png?v=0.0.9" : "https://megacloud.tube/images/loading.png?v=0.0.9"
    let Q0 = await wasmLoader(wsm);
    try {
      wasmLoader.groot();
    } catch (error) {
      console.log("error: ", error);
    }
    fake_window.jwt_plugin(Q0);
    let test = new Uint8Array(fake_window.navigate());
    return test;
  }

  const getMeta = async (url: string) => {
    let resp = await fetch(url, {
      "headers": {
        "User-Agent": user_agent,
        "Referer": referrer,
      }
    });
    let txt = await resp.text();
    let regx = /name="j_crt" content="[A-Za-z0-9]*/g
    let match = txt.match(regx)[0];
    let content = match.slice(match.lastIndexOf('"') + 1)
    meta.content = content
  }

  const newReq = async (xrax: string) => {
    try {
      await getMeta((embed_url + xrax + "?z="));
    } catch (error) {
      throw error;
    }
    fake_window.xrax = xrax;
    let keys = await V();
    
    const getSourcesBase = provider == "rabbit" ? "https://venusembed.site/ajax/v2/embed-4/getSources?id=" : "https://megacloud.tube/embed-1/ajax/e-1/getSources?id="
    let getSourcesUrl = getSourcesBase + fake_window.localStorage.pid + "&v=" + fake_window.localStorage.kversion + "&h=" + fake_window.localStorage.kid + "&b=1676800512"
    let resp_json = await (await fetch(getSourcesUrl, {
      "headers": {
        "User-Agent": user_agent,
        "X-Requested-With": "XMLHttpRequest"
      },
      "method": "GET",
      "mode": "cors"
    })).json();
    //console.log("\nResponse from getSources:");
    //console.log(resp_json);
    
    let encrypted = resp_json.sources;
    var Q3 = fake_window.localStorage.kversion;
    let tostr = '';
    tostr += Q3;
    var Q1 = r(parseInt(tostr));
    let Q8 = (R(keys, Q1), keys)

    let num: number[] = [];

    Q8.forEach(e => {
      num.push(e);
    });

    let str = btoa(String.fromCharCode.apply(null, num));
    var real = Z(encrypted, str);

    //console.log("\n Decoded sources:");
    //console.log(real);
    resp_json.sources = real;
    return resp_json;
  }
  return await newReq(xrax);
}

export { main };

const provider = "rabbit";
const id = "1l8uvOuFcpDZ";
main(provider, id);

