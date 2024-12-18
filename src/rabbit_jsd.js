//import { createCanvas, CanvasRenderingContext2D } from 'canvas';
import { JSDOM, ResourceLoader } from 'jsdom';
import cryptoJs from 'crypto-js';

const user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6668.71 Safari/537.36";

let wasm;
let arr = new Array(128).fill(void 0);
let arr32 = Int32Array | null;
let size = 0;
let memoryBuff = Uint8Array | null;


//const dateNow = Date.now() + 0.7;
let content = '';

const dataURL = "";

const meta = {
    content: content
}


let fakeElementDocument;
let i;

// Create a ResourceLoader with the desired options
const resourceLoader = new ResourceLoader({
    userAgent: user_agent,
});

async function setupJSDOM(url, referer) {
    try {
        // URL to the index.html file
        console.log(`Fetching file from: ${url}`);

        // Create JSDOM instance from URL
        const dom = await JSDOM.fromURL(url, {
            referrer: referer,
            includeNodeLocations: true,
            storageQuota: 10000000,
            pretendToBeVisual: true,
            resources: resourceLoader
        });

        global.window = dom.window;
        console.log('JSDOM setup complete');
    } catch (err) {
        console.error('Error:', err);
    }
}


async function initialize(xrax, provider) {

    const domain = provider.includes("megacloud") ? "megacloud.tube" : provider;
    const embed_url = provider.includes("megacloud") ? `https://${domain}/embed-1/e-1/` : `https://${domain}/v2/embed-4/`;
    const getSourcesBase = provider.includes("megacloud") ? `https://${provider}/embed-1/ajax/e-1/getSources?id=` : `https://${provider}/ajax/v2/embed-4/getSources?id=`;
    const referer = provider.includes("megacloud") ? 'https://2kmoviehd.to/' : 'https://flixhq.to';

    // Create a canvas using node-canvas
    // const canvas = createCanvas(300, 150);
    // const context = canvas.getContext('2d');

	await setupJSDOM(embed_url + xrax + "?z=", referer);

    // Extend the navigator object
    const navigator = window.navigator;
    navigator.webdriver = false;
    //navigator.userAgent = navigator.userAgent; // Ensure userAgent is preserved

    window.origin = `https://${domain}`;
    window.browser_version = 1878522368;

    // Extend the crypto object
    window.crypto.getRandomValues = function (array) {
        if (array === null || array.byteLength === undefined) {
            throw new TypeError('array must be an ArrayBufferView with a byteLength property');
        }
        const typedArray = new Uint8Array(array.buffer);
        for (let i = 0; i < typedArray.length; i++) {
            typedArray[i] = Math.floor(Math.random() * 256);
        }
        return array;
    };

    window.crypto.encrypt = function (data, key) {
        return cryptoJs.AES.encrypt(data, key).toString();
    };

    window.crypto.decrypt = function (ciphertext, key) {
        const bytes = cryptoJs.AES.decrypt(ciphertext, key);
        return bytes.toString(cryptoJs.enc.Utf8);
    };


    /////
    let j, wasmInstanceExports;
    const array = new Array(128).fill(void 0);
    function getFromArray(Ag) {
        return array[Ag];
    }

    array.push(void 0, null, true, false);
    let lengthCount = 0, A3 = null;
    function getMemBuffer() {


        return A3 = null !== A3 && 0 !== A3.byteLength ? A3 : new Uint8Array(wasm.memory.buffer);
    }
    const A5 = 'undefined' != typeof TextEncoder ? new TextEncoder('utf-8') : {
        'encode': () => {

            throw Error('TextEncoder not available');
        }
    }, A6 = 'function' == typeof A5.encodeInto ? function (Ag, AW) {
        return A5.encodeInto(Ag, AW);
    } : function (Ag, AW) {

        var Ar = A5.encode(Ag);
        return AW.set(Ar), {
            'read': Ag.length,
            'written': Ar.length
        };
    };
    function addToWasmBuffer(Ag, AW, Ar) {
        if (void 0 === Ar) {
            var Ad = A5.encode(Ag);
            const AV = AW(Ad.length, 1) >>> 0;
            return getMemBuffer().subarray(AV, AV + Ad.length).set(Ad), lengthCount = Ad.length, AV;
        }

        let AB = Ag.length, Al = AW(AB, 1) >>> 0;

        var Am = getMemBuffer();
        let AY = 0;
        for (; AY < AB; AY++) {
            var Ab = Ag.charCodeAt(AY);
            if (127 < Ab) {
                break;
            }
            Am[Al + AY] = Ab;
        }

        return AY !== AB && (0 !== AY && (Ag = Ag.slice(AY)), Al = Ar(Al, AB, AB = AY + 3 * Ag.length, 1) >>> 0, Ad = getMemBuffer().subarray(Al + AY, Al + AB), AW = A6(Ag, Ad), AY += AW.written, Al = Ar(Al, AB, AY, 1) >>> 0), lengthCount = AY, Al;
    }
    function isNull(Ag) {
        return null == Ag;
    }
    let A9 = null;
    function getWasmExportsMemoryBuffer() {

        return A9 = null === A9 || true === A9.buffer.detached || void 0 === A9.buffer.detached && A9.buffer !== wasm.memory.buffer ? new DataView(wasm.memory.buffer) : A9;
    }
    let Av = array.length;
    function AG(Ag) {
        if (Ag < 132) {
            array[Ag] = Av;
            Av = Ag;
        }
    }
    function getAndShift(Ag) {
        var AW = getFromArray(Ag);
        return AG(Ag), AW;
    }
    const Ak = 'undefined' != typeof TextDecoder ? new TextDecoder('utf-8', {
        'ignoreBOM': true,
        'fatal': true
    }) : {
        'decode': () => {

            throw Error('TextDecoder not available');
        }
    };
    function textDecodeSubArrayBuff(Ag, AW) {

        return Ag >>>= 0, Ak.decode(getMemBuffer().subarray(Ag, Ag + AW));
    }
    function addToStack(Ag) {
        Av === array.length && array.push(array.length + 1);

        var AW = Av;

        return Av = array[AW], array[AW] = Ag, AW;
    }
    'undefined' != typeof TextDecoder && Ak.decode();
    const AI = 'undefined' == typeof FinalizationRegistry ? {
        'register': () => {
        },
        'unregister': () => {
        }
    } : new FinalizationRegistry(Ag => {


        wasm['__wbindgen_export_2'].get(Ag.dtor)(Ag.a, Ag.b);
    });
    function An(Ag, AW, Ar, Ad) {

        const AB = {
            'a': Ag,
            'b': AW,
            'cnt': 1,
            'dtor': Ar
        };
        return Ag = (...Al) => {
            AB.cnt++;


            try {
                return Ad(AB.a, AB.b, ...Al);
            } finally {
                if (0 == --AB.cnt) {
                    wasm['__wbindgen_export_2'].get(AB.dtor)(AB.a, AB.b);
                    AB.a = 0;
                    AI.unregister(AB);
                }
            }
        }, (Ag.original = AB, AI.register(Ag, AB, AB), Ag);
    }
    let anRef = An;

    function Ao(Ag, AW) {

        return getAndShift(wasm['__wbindgen_export_3'](Ag, AW));
    }
    let aoRef = Ao;
    function AX(Ag, AW, Ar) {

        wasm['__wbindgen_export_4'](Ag, AW, addToStack(Ar));
    }
    function Au(Ag, AW) {

        wasm['__wbindgen_export_5'](Ag, AW);
    }
    function AT(Ag, AW) {

        try {
            return Ag.apply(window, AW);
        } catch (Ar) {
            wasm['__wbindgen_export_6'](addToStack(Ar));
        }
    }
    function Ap(Ag, AW) {
        AW = AW(+Ag.length, 1) >>> 0;

        return getMemBuffer().set(Ag, AW), lengthCount = Ag.length, AW;
    }
    async function AD(Ag, AW) {


        const Ar = Ag;
        const Ad = await WebAssembly.instantiate(Ar, AW);
        return Object.assign(Ad, { 'bytes': Ar });
        if (typeof Response === 'function' && Ag instanceof Response) {

        } else {
            const Ad = await WebAssembly.instantiate(Ag, AW);
            if (Ad instanceof WebAssembly.Instance) {
                return {
                    'instance': Ad,
                    'module': Ag
                };
            }
            return Ad;
        }
    }

    function getMemBuff() {
        return memoryBuff = null !== memoryBuff && 0 !== memoryBuff.byteLength ? memoryBuff : new Uint8Array(wasm.memory.buffer);
    }

    function initWasm() {

        const importedObject = { 'wbg': {} };

        return importedObject.wbg['__wbindgen_is_undefined'] = function (AW) {

            return void 0 === getFromArray(AW);
        }, importedObject.wbg['__wbindgen_is_null'] = function (AW) {

            return null === getFromArray(AW);
        }, importedObject.wbg['__wbindgen_string_get'] = function (AW, Ar) {

            var Ar = getFromArray(Ar), Ar = 'string' == typeof Ar ? Ar : void 0, Ar = isNull(Ar) ? 0 : addToWasmBuffer(Ar, wasm['__wbindgen_export_0'], wasm['__wbindgen_export_1']), Ad = lengthCount;

            getWasmExportsMemoryBuffer().setInt32(AW + 4, Ad, true);
            getWasmExportsMemoryBuffer().setInt32(AW + 0, Ar, true);

        }, importedObject.wbg['__wbindgen_object_drop_ref'] = function (AW) {
            getAndShift(AW);
        }, importedObject.wbg['__wbindgen_cb_drop'] = function (AW) {
            console.log(AW, "__wbindgen_cb_drop")
            AW = getAndShift(AW).original;
            console.log(AW, "ORIG")
            return 1 == AW.cnt-- && !(AW.a = 0);
        }, importedObject.wbg['__wbindgen_string_new'] = function (AW, Ar) {
            return addToStack(textDecodeSubArrayBuff(AW, Ar));
        }, importedObject.wbg['__wbindgen_boolean_get'] = function (AW) {
            AW = getFromArray(AW);

            return 'boolean' == typeof AW ? AW ? 1 : 0 : 2;
        }, importedObject.wbg['__wbindgen_number_get'] = function (AW, Ar) {
            Ar = getFromArray(Ar);
            Ar = 'number' == typeof Ar ? Ar : void 0;


            getWasmExportsMemoryBuffer().setFloat64(AW + 8, isNull(Ar) ? 0 : Ar, true);
            getWasmExportsMemoryBuffer().setInt32(AW + 0, !isNull(Ar), true);

        }, importedObject.wbg['__wbg_instanceof_CanvasRenderingContext2d_4ec30ddd3f29f8f9'] = function (AW) {
            let Ar;
            try {
                Ar = getFromArray(AW) instanceof CanvasRenderingContext2D;
            } catch (Ad) {
                Ar = false;
            }

            return true;
        }, importedObject.wbg['__wbg_setfillStyle_59f426135f52910f'] = function (AW, Ar) {

            //getFromArray(AW).fillStyle = getFromArray(Ar);
        }, importedObject.wbg['__wbg_setshadowBlur_229c56539d02f401'] = function (AW, Ar) {

            //getFromArray(AW).shadowBlur = Ar;
        }, importedObject.wbg['__wbg_setshadowColor_340d5290cdc4ae9d'] = function (AW, Ar, Ad) {

            //getFromArray(AW).shadowColor = textDecodeSubArrayBuff(Ar, Ad);
        }, importedObject.wbg['__wbg_setfont_16d6e31e06a420a5'] = function (AW, Ar, Ad) {
            //getFromArray(AW).font = textDecodeSubArrayBuff(Ar, Ad);
        }, importedObject.wbg['__wbg_settextBaseline_c3266d3bd4a6695c'] = function (AW, Ar, Ad) {

            //getFromArray(AW).textBaseline = textDecodeSubArrayBuff(Ar, Ad);
        }, importedObject.wbg['__wbg_drawImage_cb13768a1bdc04bd'] = function () {
            return AT(function (AW, Ar, Ad, AB) {
                let first = getFromArray(Ar);
                //console.log(first)
                //console.log(getFromArray(AW))
                //console.log(Ad, AB)
                let img = {
                    id: "happy-animal",
                    src: `https://${domain}/images/image.png?v=0.1.0`,
                    crossorigin: "anonymous",
                    style: "display: none",
                    outerHTML: `<img id="happy-animal" src="https://${domain}/images/image.png?v=0.1.0" crossorigin="anonymous" style="display: none">`
                }
                console.log(first)
                getFromArray(AW).drawImage(first, Ad, AB);
            }, arguments);
        }, importedObject.wbg['__wbg_getImageData_66269d289f37d3c7'] = function () {
            return AT(function (AW, Ar, Ad, AB, Al) {
                return addToStack(getFromArray(AW).getImageData(Ar, Ad, AB, Al));
            }, arguments);
        }, importedObject.wbg['__wbg_rect_2fa1df87ef638738'] = function (AW, Ar, Ad, AB, Al) {
            //getFromArray(AW).rect(Ar, Ad, AB, Al);
        }, importedObject.wbg['__wbg_fillRect_4dd28e628381d240'] = function (AW, Ar, Ad, AB, Al) {

            //getFromArray(AW).fillRect(Ar, Ad, AB, Al);
        }, importedObject.wbg['__wbg_fillText_07e5da9e41652f20'] = function () {
            return AT(function (AW, Ar, Ad, AB, Al) {

                //getFromArray(AW).fillText(textDecodeSubArrayBuff(Ar, Ad), AB, Al);
            }, arguments);
        }, importedObject.wbg['__wbg_setProperty_5144ddce66bbde41'] = function () {
            return AT(function (AW, Ar, Ad, AB, Al) {

                // getFromArray(AW).setProperty(textDecodeSubArrayBuff(Ar, Ad), textDecodeSubArrayBuff(AB, Al));
            }, arguments);
        }, importedObject.wbg['__wbg_createElement_03cf347ddad1c8c0'] = function () {
            return AT(function (AW, Ar, Ad) {

                return addToStack(getFromArray(AW).createElement(textDecodeSubArrayBuff(Ar, Ad)));
            }, arguments);
        }, importedObject.wbg['__wbg_querySelector_118a0639aa1f51cd'] = function () {
            return AT(function (AW, Ar, Ad) {
                let doc = getFromArray(AW);
                let textDe = textDecodeSubArrayBuff(Ar, Ad);
                console.log("doc", doc)
                console.log("textDe", textDe)
                AW = getFromArray(AW).querySelector(textDecodeSubArrayBuff(Ar, Ad));
                //console.log(AW)
                return isNull(AW) ? 0 : addToStack(AW);
            }, arguments);
        }, importedObject.wbg['__wbg_querySelectorAll_50c79cd4f7573825'] = function () {
            return AT(function (AW, Ar, Ad) {

                //console.log(getFromArray(AW).querySelectorAll(textDecodeSubArrayBuff(Ar, Ad)))
                return addToStack(getFromArray(AW).querySelectorAll(textDecodeSubArrayBuff(Ar, Ad)));
            }, arguments);
        }, importedObject.wbg['__wbg_getAttribute_706ae88bd37410fa'] = function (AW, Ar, Ad, AB) {

            Ar = getFromArray(Ar).getAttribute(textDecodeSubArrayBuff(Ad, AB));

            Ad = isNull(Ar) ? 0 : addToWasmBuffer(Ar, wasm['__wbindgen_export_0'], wasm['__wbindgen_export_1']);
            AB = lengthCount;



            getWasmExportsMemoryBuffer().setInt32(AW + 4, AB, true);
            getWasmExportsMemoryBuffer().setInt32(AW + 0, Ad, true);

        }, importedObject.wbg['__wbg_target_6795373f170fd786'] = function (AW) {
            console.log("target", getFromArray(AW))
            //return AW = getFromArray(AW).target, isNull(AW) ? 0 : addToStack(AW);
        }, importedObject.wbg['__wbg_addEventListener_f984e99465a6a7f4'] = function () {
            return AT(function (AW, Ar, Ad, AB) {
                //getFromArray(AW).addEventListener(textDecodeSubArrayBuff(Ar, Ad), getFromArray(AB));
            }, arguments);
        }, importedObject.wbg['__wbg_instanceof_HtmlCanvasElement_1e81f71f630e46bc'] = function (AW) {
            let Ar;
            try {
                Ar = getFromArray(AW) instanceof HTMLCanvasElement;
            } catch (Ad) {
                Ar = false;
            }
            return true;
        }, importedObject.wbg['__wbg_setwidth_233645b297bb3318'] = function (AW, Ar) {

            //getFromArray(AW).width = Ar >>> 0;
        }, importedObject.wbg['__wbg_setheight_fcb491cf54e3527c'] = function (AW, Ar) {

            //getFromArray(AW).height = Ar >>> 0;
        }, importedObject.wbg['__wbg_getContext_dfc91ab0837db1d1'] = function () {
            return AT(function (AW, Ar, Ad) {
                console.log("AW", getFromArray(AW))
                console.log(textDecodeSubArrayBuff(Ar, Ad))
                AW = getFromArray(AW).getContext(textDecodeSubArrayBuff(Ar, Ad));
                console.log("aw CONTEXT", AW)
                return isNull(AW) ? 0 : addToStack(AW);
            }, arguments);
        }, importedObject.wbg['__wbg_toDataURL_97b108dd1a4b7454'] = function () {
            return AT(function (AW, Ar) {

                var Ar = addToWasmBuffer(getFromArray(Ar).toDataURL(), wasm['__wbindgen_export_0'], wasm['__wbindgen_export_1']), Ad = lengthCount;

                getWasmExportsMemoryBuffer().setInt32(AW + 4, Ad, true);
                getWasmExportsMemoryBuffer().setInt32(AW + 0, Ar, true);

            }, arguments);
        }, importedObject.wbg['__wbg_style_ca229e3326b3c3fb'] = function (AW) {

            return addToStack(getFromArray(AW).style);
        }, importedObject.wbg['__wbg_instanceof_HtmlImageElement_9c82d4e3651a8533'] = function (AW) {
            let Ar;
            try {
                Ar = getFromArray(AW) instanceof HTMLImageElement;
            } catch (Ad) {
                Ar = false;
            }
            return true;
        }, importedObject.wbg['__wbg_src_87a0e38af6229364'] = function (AW, Ar) {
            let src = `https://${domain}/images/image.png?v=0.1.0`
            console.log(src);
            var Ar = addToWasmBuffer(src, wasm['__wbindgen_export_0'], wasm['__wbindgen_export_1']), Ad = lengthCount;
            getWasmExportsMemoryBuffer().setInt32(AW + 4, Ad, true);
            getWasmExportsMemoryBuffer().setInt32(AW + 0, Ar, true);

        }, importedObject.wbg['__wbg_width_e1a38bdd483e1283'] = function (AW) {
            return getFromArray(AW).width;
        }, importedObject.wbg['__wbg_height_e4cc2294187313c9'] = function (AW) {

            return getFromArray(AW).height;
        }, importedObject.wbg['__wbg_complete_1162c2697406af11'] = function (AW) {

            return getFromArray(AW).complete;
        }, importedObject.wbg['__wbg_data_d34dc554f90b8652'] = function (AW, Ar) {
            var Ar = Ap(getFromArray(Ar).data, wasm['__wbindgen_export_0']), Ad = lengthCount;


            getWasmExportsMemoryBuffer().setInt32(AW + 4, Ad, true);
            getWasmExportsMemoryBuffer().setInt32(AW + 0, Ar, true);

        }, importedObject.wbg['__wbg_origin_305402044aa148ce'] = function () {
            return AT(function (AW, Ar) {
                console.log(getFromArray(Ar).origin, "__wbg_origin_305402044aa148ce")
                var Ar = addToWasmBuffer(getFromArray(Ar).origin, wasm['__wbindgen_export_0'], wasm['__wbindgen_export_1']), Ad = lengthCount;

                getWasmExportsMemoryBuffer().setInt32(AW + 4, Ad, true);
                getWasmExportsMemoryBuffer().setInt32(AW + 0, Ar, true);

            }, arguments);
        }, importedObject.wbg['__wbg_length_8a9352f7b7360c37'] = function (AW) {

            return getFromArray(AW).length;
        }, importedObject.wbg['__wbg_get_c30ae0782d86747f'] = function (AW, Ar) {
            return AW = getFromArray(AW)[Ar >>> 0], isNull(AW) ? 0 : addToStack(AW);
        }, importedObject.wbg['__wbg_timeOrigin_f462952854d802ec'] = function (AW) {

            return getFromArray(AW).timeOrigin;
        }, importedObject.wbg['__wbg_instanceof_Window_cee7a886d55e7df5'] = function (AW) {
            let Ar;
            try {
                Ar = getFromArray(AW) instanceof Window;
            } catch (Ad) {
                Ar = false;
            }
            return true;
        }, importedObject.wbg['__wbg_document_eb7fd66bde3ee213'] = function (AW) {
            AW = window.document;
            return isNull(AW) ? 0 : addToStack(AW);
        }, importedObject.wbg['__wbg_location_b17760ac7977a47a'] = function (AW) {
            return addToStack(getFromArray(AW).location);
        }, importedObject.wbg['__wbg_localStorage_3d538af21ea07fcc'] = function () {
            return AT(function (AW) {
                AW = getFromArray(AW).localStorage;

                return isNull(AW) ? 0 : addToStack(AW);
            }, arguments);
        }, importedObject.wbg['__wbg_performance_4ca1873776fdb3d2'] = function (AW) {

            return AW = getFromArray(AW).performance, isNull(AW) ? 0 : addToStack(AW);
        }, importedObject.wbg['__wbg_origin_e1f8acdeb3a39a2b'] = function (AW, Ar) {
            let winRef = getFromArray(Ar)
            var Ar = addToWasmBuffer(winRef.origin, wasm['__wbindgen_export_0'], wasm['__wbindgen_export_1']), Ad = lengthCount;
            getWasmExportsMemoryBuffer().setInt32(AW + 4, Ad, true);
            getWasmExportsMemoryBuffer().setInt32(AW + 0, Ar, true);

        }, importedObject.wbg['__wbg_get_8986951b1ee310e0'] = function (AW, Ar, Ad) {
            console.log(getFromArray(AW), "__wbg_get_8986951b1ee310e0")
            console.log(getFromArray(AW), "__wbg_get_8986951b1ee310e0")
            return AW = getFromArray(AW)[textDecodeSubArrayBuff(Ar, Ad)], isNull(AW) ? 0 : addToStack(AW);
        }, importedObject.wbg['__wbg_setTimeout_6ed7182ebad5d297'] = function () {
            return AT(function (AW, Ar, Ad) {

                return getFromArray(AW).setTimeout(getFromArray(Ar), Ad);
            }, arguments);
        }, importedObject.wbg['__wbindgen_is_object'] = function (AW) {
            AW = getFromArray(AW);

            return 'object' == typeof AW && null !== AW;
        }, importedObject.wbg['__wbg_crypto_1d1f22824a6a080c'] = function (AW) {
            console.log(getFromArray(AW), "__wbg_crypto_1d1f22824a6a080c")
            return addToStack(getFromArray(AW).crypto);
        }, importedObject.wbg['__wbg_process_4a72847cc503995b'] = function (AW) {

            //return addToStack(getFromArray(AW).process);
        }, importedObject.wbg['__wbg_versions_f686565e586dd935'] = function (AW) {

            //return addToStack(getFromArray(AW).versions);
        }, importedObject.wbg['__wbg_node_104a2ff8d6ea03a2'] = function (AW) {

            //return addToStack(getFromArray(AW).node);
        }, importedObject.wbg['__wbindgen_is_string'] = function (AW) {

            return 'string' == typeof getFromArray(AW);
        }, importedObject.wbg['__wbg_require_cca90b1a94a0255b'] = function () {
            return AT(function () {
                console.log("__wbg_require_cca90b1a94a0255b")
                //return addToStack(module.require);
            }, arguments);
        }, importedObject.wbg['__wbg_msCrypto_eb05e62b530a1508'] = function (AW) {
            console.log("__wbg_msCrypto_eb05e62b530a1508")
            //return addToStack(getFromArray(AW).msCrypto);
        }, importedObject.wbg['__wbg_randomFillSync_5c9c955aa56b6049'] = function () {
            return AT(function (AW, Ar) {
                console.log(getFromArray(AW), "__wbg_randomFillSync_5c9c955aa56b6049")
                let random = getAndShift(Ar)
                console.log(random, "__wbg_randomFillSync_5c9c955aa56b6049")
                //getFromArray(AW).randomFillSync(random);
            }, arguments);
        }, importedObject.wbg['__wbg_getRandomValues_3aa56aa6edec874c'] = function () {
            return AT(function (AW, Ar) {
                console.log(getFromArray(Ar), "__wbg_getRandomValues_3aa56aa6edec874c")

                getFromArray(AW).getRandomValues(getFromArray(Ar));
            }, arguments);
        }, importedObject.wbg['__wbindgen_is_function'] = function (AW) {
            console.log("__wbindgen_is_function", getFromArray(AW))
            return 'function' == typeof getFromArray(AW);
        }, importedObject.wbg['__wbg_self_05040bd9523805b9'] = function () {
            return AT(function () {

                return addToStack(window);
            }, arguments);
        }, importedObject.wbg['__wbg_window_adc720039f2cb14f'] = function () {
            return AT(function () {

                return addToStack(window);
            }, arguments);
        }, importedObject.wbg['__wbg_globalThis_622105db80c1457d'] = function () {
            return AT(function () {

                return addToStack(window);
            }, arguments);
        }, importedObject.wbg['__wbg_global_f56b013ed9bcf359'] = function () {
            return AT(function () {

                return addToStack(window);
            }, arguments);
        }, importedObject.wbg['__wbg_newnoargs_cfecb3965268594c'] = function (AW, Ar) {
            console.log(textDecodeSubArrayBuff(AW, Ar), "__wbg_newnoargs_cfecb3965268594c")
            //return addToStack(new Function(textDecodeSubArrayBuff(AW, Ar)));
        }, importedObject.wbg['__wbindgen_object_clone_ref'] = function (AW) {
            console.log(getFromArray(AW), "__wbindgen_object_clone_ref")
            return addToStack(getFromArray(AW));
        }, importedObject.wbg['__wbg_eval_c824e170787ad184'] = function () {
            return AT(function (AW, Ar) {
                console.log("__wbg_eval_c824e170787ad184")
                let first = textDecodeSubArrayBuff(AW, Ar)
                console.log(first)
                const Ad = eval(first);
                //fakeWindow.pid = window.pid
                console.log(first, Ad, "__wbg_eval_c824e170787ad184")
                return addToStack(Ad);
            }, arguments);
        }, importedObject.wbg['__wbg_call_3f093dd26d5569f8'] = function () {
            return AT(function (AW, Ar) {

                return addToStack(getFromArray(AW).call(getFromArray(Ar)));
            }, arguments);
        }, importedObject.wbg['__wbg_call_67f2111acd2dfdb6'] = function () {
            return AT(function (AW, Ar, Ad) {

                return addToStack(getFromArray(AW).call(getFromArray(Ar), getFromArray(Ad)));
            }, arguments);
        }, importedObject.wbg['__wbg_toString_6eb7c1f755c00453'] = function (AW) {
            console.log(getFromArray(AW).toString(), "__wbg_toString_6eb7c1f755c00453")
            return addToStack(getFromArray(AW).toString());
        }, importedObject.wbg['__wbg_set_961700853a212a39'] = function () {
            return AT(function (AW, Ar, Ad) {
                console.log("__wbg_set_961700853a212a39", getFromArray(Ar))
                return Reflect.set(getFromArray(AW), getFromArray(Ar), getFromArray(Ad));
            }, arguments);
        }, importedObject.wbg['__wbg_buffer_b914fb8b50ebbc3e'] = function (AW) {
            console.log(getFromArray(AW).buffer, "1")
            return addToStack(getFromArray(AW).buffer);
        }, importedObject.wbg['__wbg_toString_139023ab33acec36'] = function (AW) {

            return addToStack(getFromArray(AW).toString());
        }, importedObject.wbg['__wbg_newwithbyteoffsetandlength_0de9ee56e9f6ee6e'] = function (AW, Ar, Ad) {
            return addToStack(new Uint8Array(getFromArray(AW), Ar >>> 0, Ad >>> 0));
        }, importedObject.wbg['__wbg_new_b1f2d6842d615181'] = function (AW) {
            return addToStack(new Uint8Array(getFromArray(AW)));
        }, importedObject.wbg['__wbg_newwithlength_0d03cef43b68a530'] = function (AW) {
            console.log(AW, "__wbg_newwithlength_0d03cef43b68a530")
            return addToStack(new Uint8Array(AW >>> 0));
        }, importedObject.wbg['__wbg_buffer_67e624f5a0ab2319'] = function (AW) {
            console.log(getFromArray(AW).buffer, "2")
            return addToStack(getFromArray(AW).buffer);
        }, importedObject.wbg['__wbg_subarray_adc418253d76e2f1'] = function (AW, Ar, Ad) {

            console.log(AW, "__wbg_subarray_adc418253d76e2f1")
            console.log(AW, "__wbg_subarray_adc418253d76e2f1")

            let subArr = getFromArray(AW).subarray(Ar >>> 0, Ad >>> 0)
            console.log(subArr, "__wbg_subarray_adc418253d76e2f1")

            return addToStack(subArr);

        }, importedObject.wbg['__wbg_length_21c4b0ae73cba59d'] = function (AW) {
            //179
            return getFromArray(AW).length;
        }, importedObject.wbg['__wbg_set_7d988c98e6ced92d'] = function (AW, Ar, Ad) {

            getFromArray(AW).set(getFromArray(Ar), Ad >>> 0);
        }, importedObject.wbg['__wbindgen_throw'] = function (AW, Ar) {
            throw new Error(textDecodeSubArrayBuff(AW, Ar));
        }, importedObject.wbg['__wbindgen_memory'] = function () {
            return addToStack(wasm.memory);
        }, importedObject.wbg['__wbindgen_closure_wrapper117'] = function (AW, Ar, Ad) {
            return addToStack(An(AW, Ar, 2, Ao));
        }, importedObject.wbg['__wbindgen_closure_wrapper119'] = function (AW, Ar, Ad) {
            return addToStack(An(AW, Ar, 2, AX));
        }, importedObject.wbg['__wbindgen_closure_wrapper121'] = function (AW, Ar, Ad) {
            return addToStack(An(AW, Ar, 2, Au));
        }, importedObject.wbg['__wbindgen_closure_wrapper123'] = function (AW, Ar, Ad) {
            return addToStack(An(AW, Ar, 9, AX));
        }, importedObject;
    }

    //WebAssembly baseline compiler dis
	function assignWasm(resp) {
		wasm = resp.exports;
		arr32 = null, memoryBuff = null, wasm;
	}

	function QZ(QP) {
		let Qn;
		return void 0 !== wasm ? wasm : (Qn = initWasm(), QP instanceof WebAssembly.Module || (QP = new WebAssembly.Module(QP)), assignWasm(new WebAssembly.Instance(QP, Qn)));
	}

    async function QN(QP, Qn) {
		let QT, Qt;
		return 'function' == typeof Response && QP instanceof Response ? (QT = await QP.arrayBuffer(), Qt = await WebAssembly.instantiate(QT, Qn), Object.assign(Qt, {'bytes': QT})) : (Qt = await WebAssembly.instantiate(QP, Qn)) instanceof WebAssembly.Instance ? {
			'instance': Qt,
			'module': QP
		} : Qt;
	}

	// todo!
    async function loadWasm(url) {
        let mod, buffer;
        return void 0 !== wasm ? wasm : (mod = initWasm(), {
            instance: url,
            module: mod,
            bytes: buffer
        } = (url = fetch(url), void 0, await QN(await url, mod)), assignWasm(url), buffer);
    }

    const greetLoader = {
        greet: function () {
            wasm.groot();
        }
    }

    let wasmLoader = Object.assign(loadWasm, {'initSync': QZ}, greetLoader);

    const Z = (z, Q0) => {
        try {
            var Q1 = cryptoJs.AES.decrypt(z, Q0);
            return JSON.parse(Q1.toString(cryptoJs.enc.Utf8));
        } catch (Q2) {
        }
        return [];
    }

    const R = (z, Q0) => {
        try {
            for (let Q1 = 0; Q1 < z.length; Q1++) {
                z[Q1] = z[Q1] ^ Q0[Q1 % Q0.length];
            }
        } catch (Q2) {
            return null;
        }
    }

    function r(z) {
        return [
            (4278190080 & z) >> 24,
            (16711680 & z) >> 16,
            (65280 & z) >> 8,
            255 & z
        ];
    }

    const V = async () => {
        let Q0 = await wasmLoader('https://' + domain + '/images/loading.png?v=0.0.9');
        try {
            window.bytes = Q0;
            wasmLoader.greet();
        } catch (error) {
            console.log("error: ", error);
        }
        window.jwt_plugin(Q0);
    }

    const getMeta = async (url) => {
        let resp = await fetch(url, {
            "headers": {
                "User-Agent": user_agent,
                "Referer": referer,
            }
        });
        let txt = await resp.text();
        let regx = /name="j_crt" content="[A-Za-z0-9=]*/g
        // @ts-ignore
        let match = txt.match(regx)[0];
        let content = match.slice(match.lastIndexOf('"') + 1)
        console.log('content:', content)
        meta.content = content;
    }

    const main = async (xrax) => {
        await getMeta((embed_url + xrax + "?z="));
        window.xrax = xrax;
        await V();
        
        const getSourcesUrl = getSourcesBase + window.pid + "&v=" + window.localStorage.kversion + "&h=" + window.localStorage.kid + "&b=" + window.browser_version;
        console.log(getSourcesUrl)
        let resp_json = await (await fetch(getSourcesUrl, {
            "headers": {
                "User-Agent": user_agent,
                "Referer": `${embed_url}${xrax}?z=`,
                "X-Requested-With": "XMLHttpRequest"
            },
            "method": "GET",
            "mode": "cors"
        })).json();
        console.log("\nResponse from getSources:");
        console.log(resp_json);

        let encrypted = resp_json.sources;
        let keys = new Uint8Array(window.navigate());
        var Q3 = window.localStorage.kversion;
        let tostr = '';
        tostr += Q3;
        var Q1 = r(parseInt(tostr));
        let Q8 = (R(keys, Q1), keys);

        let num = [];
        Q8.forEach(e => {
            num.push(e);
        });

        let str = btoa(String.fromCharCode.apply(null, num));
        console.log(`key:${str}`);
        var real = Z(encrypted, str);

        console.log("\nDecoded sources:");
        //console.log(real);
        resp_json.sources = real;
        return resp_json;
    }

    // Initialize and run the main function
    let resp_json = await main(xrax);
    console.log(JSON.stringify(resp_json));

}

// Call the initialize function to set up JSDOM and run the main function
initialize("CVj37iXamO23", "zizicoi.online");
