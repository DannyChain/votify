/* eslint-disable no-undef */
window.onload = function () {
  if (window.hive_keychain) {
    hive_keychain.requestHandshake(function () {
      keyChainEnabled = 0;
      console.log("Hive Keychain Handshake Detected!");
    });
  }
};
