class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  draw(ctx) {
    for (const point of this.points) {
      point.draw(ctx);
    }

    for (const segment of this.segments) {
      segment.draw(ctx);
    }
  }

  hasSegments() {
    return this.segments.length ? this.segments.length : false;
  }

  hasPoints() {
    return this.points.length ? this.points.length : false;
  }

  addPoint(point) {
    this.points.push(point);
  }

  containsPoint(point) {
    return this.points.find((p) => p.matches(point))
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  containsSegment(segment) {
    return this.segments.find((s) => s.matches(segment))
  }

  tryAddSegment(segment) {
    if (!this.containsSegment(segment)) {
      this.addSegment(segment);
      return true;
    }
    return false;
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  removePoint(point) {
    let segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  getSegmentsWithPoint(point) {
    const segs = [];
    for (const segment of this.segments) {
      if (segment.hasPoint(point)) {
        segs.push(segment)
      }
    }
    return segs;
  }

  clear() {
    this.points.length = 0;
    this.segments.length = 0;
  }
}