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

double gravity = 1.01;

void main() {
  g = new Graphics.blank();
  g.setSize(1280, 1280);

  mouseX = g.width / 2;
  mouseY = g.height / 2;

  document.onMouseMove.listen((MouseEvent e) {
    mouseX = e.client.x;
    mouseY = e.client.y;
  });

  document.onMouseDown.listen((MouseEvent e) {
    gravity = 0.0099;
    particles.forEach((p) {
//      p.x = random.nextDouble() * g.width;
//      p.y = random.nextDouble() * g.height;
    });
  });
  document.onMouseUp.listen((MouseEvent e) => gravity = 1.01);

  Dom.body.append(g.canvas);

  particles = [];
  new List.generate(1000, (i) => i + 1).forEach((d) => particles.add(new Particle(mouseX, mouseY, velx: random.nextDouble() * 80 - 40, vely: random.nextDouble() * 80 - 40, lifetime: 100)));
  spawnParticles(null);
//  drawCircle(g.width / 2, g.height / 2, g.width / 4);
}

void spawnParticles(_) {
  g.clear();

  for (int i = 0; i < particles.length; i++) {
    if (!particles[i].update()) {
      particles.removeAt(i);
    }
  }

  particles.forEach((p) => p.render(g));

//  new List.generate(7, (i) => i + 1).forEach((d) => particles.add(new Particle(mouseX, mouseY, velx: random.nextDouble() - 0.5, vely: random.nextDouble() - 0.5, lifetime: 100)));

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
  var accelx, accely;
  var lifetime;
  bool isDead = false;

  Particle (this.x, this.y, {this.velx = 0, this.vely = 0, this.lifetime = 500}) {
    x = g.width / 2;
    y = g.height / 2;
    accelx = 0;
    accely = 0;
  }

  bool update() {
    double len = sqrt((mouseX - x) * (mouseX - x) + (mouseY - y) * (mouseY - y));
    if(len != 0) {
      accelx += (mouseX - x) / len * 1 / gravity;
      accely += (mouseY - y) / len * 1 / gravity;
    }

//    if (accelx > 1) accelx = 1;
//    if (accely > 1) accely = 1;
//    if (accelx < -1) accelx = -1;
//    if (accely < -1) accely = -1;

    velx += accelx;
    vely += accely;

    double dot = sqrt(velx * velx + vely * vely);
    if (dot > 12 && dot != 0) {
      velx = velx / dot * 12;
      vely = vely / dot * 12;
    }

    if (dot < -12 && dot != 0) {
      velx = velx / dot * 12;
      vely = vely / dot * 12;
    }

    x += velx;
    y += vely;

    if (x > g.width) {
      velx *= -1;
      x = g.width;
    } else if (x < 0) {
      velx *= -1;
      x = 0;
    }

    if (y > g.height) {
      vely *= -1;
      y = g.height;
    } else if (y < 0) {
      vely *= -1;
      y = 0;
    }

//    lifetime--;
    if (lifetime <= 0) return false;
    return true;
  }

  void render(g) {
    var scale = lifetime / 100;
    g.setFillColor('rgb(${(255 * velx / 20).toInt()}, ${(255 * pow(vely / 20, 2)).toInt()}, ${(255 * pow(scale, 4)).toInt()})');
    var size = 2 * scale;
    g.fillRect(x - size, y - size, size, size);
  }

}
