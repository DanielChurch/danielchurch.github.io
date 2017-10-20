import 'dart:core';
import 'dart:html';
import 'dart:math';

import 'dom.dart';
import 'graphics.dart';

Graphics g;
int _id = 0;
var mouseX, mouseY;

bool useUp = false;

List<Particle> particles;

Random random = new Random();

void main() {
  g = new Graphics.blank();
  g.setSize(1280, 1280);

  document.onMouseMove.listen((MouseEvent e) {
    mouseX = e.client.x;
    mouseY = e.client.y;
  });

  document.onMouseDown.listen((MouseEvent e) {
    useUp = !useUp;
    g.clear();
    drawCircle(g.width / 2, g.height / 2, g.width / 4);
  });

  Dom.body.append(g.canvas);

//  particles = [];
//  spawnParticles(null);
  drawCircle(g.width / 2, g.height / 2, g.width / 4);
}

void spawnParticles(_) {
  g.clear();

  for (int i = 0; i < particles.length; i++) {
    if (!particles[i].update()) {
      particles.removeAt(i);
    }
  }

  g.setColor('rgb(255, 255, 255)');
  particles.forEach((p) => p.render(g));

  new List.generate(7, (i) => i + 1).forEach((d) => particles.add(new Particle(mouseX, mouseY, velx: random.nextDouble() - 0.5, vely: random.nextDouble() - 0.5, lifetime: 100)));

  window.animationFrame.then(spawnParticles);
}

void drawCircle(x, y, r) {
  g.drawOval(x, y, r);
  if (r > 2) {
    drawCircle(x - r, y, r / 2);
    drawCircle(x + r, y, r / 2);
    if (useUp) drawCircle(x, y - r, r / 2);
  }
}

class Particle {

  var x, y;
  var velx, vely;
  var lifetime;
  bool isDead = false;

  Particle (this.x, this.y, {this.velx = 0, this.vely = 0, this.lifetime = 500}) {
    x = x ?? 0;
    y = y ?? 0;
  }

  bool update() {
    vely += 0.00981;
    x += velx;
    y += vely;
    lifetime--;
    if (lifetime <= 0) return false;
    return true;
  }

  void render(g) {
    var scale = lifetime / 100;
    g.setFillColor('rgb(${(255 * scale).toInt()}, ${(255 * pow(scale, 2)).toInt()}, ${(255 * pow(scale, 4)).toInt()})');
    var size = 4 * scale;
    g.fillRect(x - size, y - size, size, size);
  }

}
