import 'dart:html';

class Dom extends Element {

  factory Dom._con() => querySelector('');

  factory Dom.img() => new Element.img();

  static get body => querySelector('body');

}