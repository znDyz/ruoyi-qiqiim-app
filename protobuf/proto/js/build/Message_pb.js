/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Model', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Model = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Model, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Model.displayName = 'proto.Model';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Model.prototype.toObject = function(opt_includeInstance) {
  return proto.Model.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Model} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Model.toObject = function(includeInstance, msg) {
  var f, obj = {
    version: jspb.Message.getFieldWithDefault(msg, 1, ""),
    deviceid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    cmd: jspb.Message.getFieldWithDefault(msg, 3, 0),
    sender: jspb.Message.getFieldWithDefault(msg, 4, ""),
    receiver: jspb.Message.getFieldWithDefault(msg, 5, ""),
    groupid: jspb.Message.getFieldWithDefault(msg, 6, ""),
    msgtype: jspb.Message.getFieldWithDefault(msg, 7, 0),
    flag: jspb.Message.getFieldWithDefault(msg, 8, 0),
    platform: jspb.Message.getFieldWithDefault(msg, 9, ""),
    platformversion: jspb.Message.getFieldWithDefault(msg, 10, ""),
    token: jspb.Message.getFieldWithDefault(msg, 11, ""),
    appkey: jspb.Message.getFieldWithDefault(msg, 12, ""),
    timestamp: jspb.Message.getFieldWithDefault(msg, 13, ""),
    sign: jspb.Message.getFieldWithDefault(msg, 14, ""),
    content: msg.getContent_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Model}
 */
proto.Model.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Model;
  return proto.Model.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Model} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Model}
 */
proto.Model.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setVersion(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeviceid(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setCmd(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSender(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setReceiver(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setGroupid(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setMsgtype(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setFlag(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setPlatform(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setPlatformversion(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setToken(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setAppkey(value);
      break;
    case 13:
      var value = /** @type {string} */ (reader.readString());
      msg.setTimestamp(value);
      break;
    case 14:
      var value = /** @type {string} */ (reader.readString());
      msg.setSign(value);
      break;
    case 15:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setContent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Model.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Model.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Model} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Model.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVersion();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDeviceid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCmd();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getSender();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getReceiver();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getGroupid();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getMsgtype();
  if (f !== 0) {
    writer.writeUint32(
      7,
      f
    );
  }
  f = message.getFlag();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
  f = message.getPlatform();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getPlatformversion();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getToken();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getAppkey();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getTimestamp();
  if (f.length > 0) {
    writer.writeString(
      13,
      f
    );
  }
  f = message.getSign();
  if (f.length > 0) {
    writer.writeString(
      14,
      f
    );
  }
  f = message.getContent_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      15,
      f
    );
  }
};


/**
 * optional string version = 1;
 * @return {string}
 */
proto.Model.prototype.getVersion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.Model.prototype.setVersion = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string deviceId = 2;
 * @return {string}
 */
proto.Model.prototype.getDeviceid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.Model.prototype.setDeviceid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional uint32 cmd = 3;
 * @return {number}
 */
proto.Model.prototype.getCmd = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.Model.prototype.setCmd = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string sender = 4;
 * @return {string}
 */
proto.Model.prototype.getSender = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.Model.prototype.setSender = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional string receiver = 5;
 * @return {string}
 */
proto.Model.prototype.getReceiver = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.Model.prototype.setReceiver = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string groupId = 6;
 * @return {string}
 */
proto.Model.prototype.getGroupid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.Model.prototype.setGroupid = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional uint32 msgtype = 7;
 * @return {number}
 */
proto.Model.prototype.getMsgtype = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/** @param {number} value */
proto.Model.prototype.setMsgtype = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional uint32 flag = 8;
 * @return {number}
 */
proto.Model.prototype.getFlag = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/** @param {number} value */
proto.Model.prototype.setFlag = function(value) {
  jspb.Message.setField(this, 8, value);
};


/**
 * optional string platform = 9;
 * @return {string}
 */
proto.Model.prototype.getPlatform = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/** @param {string} value */
proto.Model.prototype.setPlatform = function(value) {
  jspb.Message.setField(this, 9, value);
};


/**
 * optional string platformVersion = 10;
 * @return {string}
 */
proto.Model.prototype.getPlatformversion = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/** @param {string} value */
proto.Model.prototype.setPlatformversion = function(value) {
  jspb.Message.setField(this, 10, value);
};


/**
 * optional string token = 11;
 * @return {string}
 */
proto.Model.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/** @param {string} value */
proto.Model.prototype.setToken = function(value) {
  jspb.Message.setField(this, 11, value);
};


/**
 * optional string appKey = 12;
 * @return {string}
 */
proto.Model.prototype.getAppkey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/** @param {string} value */
proto.Model.prototype.setAppkey = function(value) {
  jspb.Message.setField(this, 12, value);
};


/**
 * optional string timeStamp = 13;
 * @return {string}
 */
proto.Model.prototype.getTimestamp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 13, ""));
};


/** @param {string} value */
proto.Model.prototype.setTimestamp = function(value) {
  jspb.Message.setField(this, 13, value);
};


/**
 * optional string sign = 14;
 * @return {string}
 */
proto.Model.prototype.getSign = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 14, ""));
};


/** @param {string} value */
proto.Model.prototype.setSign = function(value) {
  jspb.Message.setField(this, 14, value);
};


/**
 * optional bytes content = 15;
 * @return {!(string|Uint8Array)}
 */
proto.Model.prototype.getContent = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 15, ""));
};


/**
 * optional bytes content = 15;
 * This is a type-conversion wrapper around `getContent()`
 * @return {string}
 */
proto.Model.prototype.getContent_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getContent()));
};


/**
 * optional bytes content = 15;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContent()`
 * @return {!Uint8Array}
 */
proto.Model.prototype.getContent_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getContent()));
};


/** @param {!(string|Uint8Array)} value */
proto.Model.prototype.setContent = function(value) {
  jspb.Message.setField(this, 15, value);
};


goog.object.extend(exports, proto);
