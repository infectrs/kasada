var OPCODE_HANDLERS = [
  function(n, e, a) {
    a(n, +e(n));
  }, function(n, e, a, _, u) {
    var r = u[1];
    a(n, r[0]);
  }, function(n, e, a, _, u, r) {
    var l = r[0],
      o = e(n);
    l(n, o);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) << e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) & l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) < l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) !== e(n));
  }, function(n, e, a) {
    a(n, e(n) + e(n));
  }, function(n, e, a) {
    a(n, []);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) + e(n));
  }, function(n, e, a, _, u, r) {
    var l = e(n),
      o = e(n),
      i = e(n),
      f = r[4],
      s = r[5],
      v = r[7];
    if (o[f] && o[f].k === o) {
      n.W = [o[f].t, {
        F: l,
        P: o,
        W: s(n.W, v),
        R: s(v(), v),
        T: [],
        q: o[f].q
      }, void 0, function() {
        return arguments;
      }.apply(void 0, i)];
      for (var m = 0; m < i.length; m++) n.W.push(i[m]);
    } else n.W[2] = o.apply(l, i);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) - l(n));
  }, function(n, e) {
    var a = e(n);
    n.W[1].z = a;
  }, function(n, e, a) {
    a(n, e(n) + e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) + l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[0],
      o = r[1];
    if (n.B) o(n, n.B.u);
    else {
      var i = _(n);
      i != null && i.Q && l(n, i.Q.u);
    }
  }, function(n, e) {
    e(n) ? n.W[0] = e(n) : e(n);
  }, function(n, e, a, _, u, r) {
    var l = e(n),
      o = e(n),
      i = e(n),
      f = _(n),
      s = r[2],
      v = r[3],
      m = r[4],
      p = r[5],
      b = r[6],
      d = function() {
        var h = s();
        h.W[3] = arguments;
        for (var R = 0; R < arguments.length; R++) h.W[R + 4] = arguments[R];
        return h.W[1] = {
          F: this,
          W: function() {
            return [0];
          },
          R: function() {
            return [0];
          },
          T: [],
          q: p(f, b),
          P: d
        }, h.W[0] = l, v(h), h.W[2];
      };
    try {
      Object.defineProperty(d, "length", {
        value: i
      }), Object.defineProperty(d, "name", {
        value: o
      });
    } catch (y) {
      for (var t = !1, V = "", g = 0; g < i; g++) t ? V += ",a".concat(g) : (V += "a".concat(g), t = !0);
      d = new Function("fn", "return function ".concat(o, "(").concat(V, "){return fn.apply(this, arguments)}"))(d);
    }
    d[m] = {
      t: l,
      q: p(f, b),
      k: d
    }, a(n, d);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) + l(n));
  }, function(n, e, a) {
    var _ = e(n),
      u = e(n);
    a(n, _ < u);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) in l(n));
  }, function(n, e, a) {
    a(n, new Array(e(n)));
  }, function(n, e, a) {
    a(n, e(n)[e(n)]);
  }, function(n, e, a, _) {
    var u = e(n),
      r = _(n),
      l = r.P;
    r.T[u] = l;
  }, function(n, e, a, _, u, r) {
    var l = r[1],
      o = e(n);
    l(n, o);
  }, function(n, e, a) {
    a(n, e(n) ^ e(n));
  }, function(n, e, a) {
    var _ = e(n),
      u = e(n).slice();
    u.unshift(void 0), a(n, new(Function.bind.apply(_, u))());
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) == l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) ^ l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) & e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) < e(n));
  }, function(n, e, a) {
    a(n, typeof e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) == l(n));
  }, function(n, e, a) {
    a(n, e(n) === e(n));
  }, function(n, e, a) {
    var _ = e(n),
      u = e(n);
    a(n, _(u));
  }, function(n, e, a) {
    a(n, e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) / l(n));
  }, function(n, e, a) {
    var _ = e(n),
      u = e(n);
    a(n, delete _[u]);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) <= e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) != l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) == e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) > e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) << l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) % e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) - e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) - l(n));
  }, function(n, e, a) {
    var _ = e(n),
      u = e(n),
      r = e(n);
    a(n, _(u, r));
  }, function(n, e, a) {
    a(n, n.B && n.B.u);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) >> l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) >> l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) === l(n));
  }, function(n, e, a) {
    var _ = e(n),
      u = [];
    for (var r in _) u.push(r);
    a(n, u);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) / e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) | l(n));
  }, function(n, e, a, _) {
    var u = e(n),
      r = e(n),
      l = _(n);
    l.T[u] = r;
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) instanceof l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) !== l(n));
  }, function(n, e, a) {
    var _ = e(n),
      u = e(n);
    a(n, _ == u);
  }, function(n, e, a) {
    a(n, n.W[1].F);
  }, function(n, e, a) {
    var _ = e(n);
    a(n, _());
  }, function(n, e, a, _, u) {
    var r = u[1];
    a(n, r[1]);
  }, function(n, e, a, _) {
    for (var u = e(n), r = _(n); r; r = r.q())
      if (u in r.T) {
        a(n, r.T[u]);
        return;
      }
    throw 'ball';
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) * l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) & l(n));
  }, function(n, e) {
    e(n) ? e(n) : n.W[0] = e(n);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) ^ e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) in l(n));
  }, function(n, e, a) {
    a(n, ~e(n));
  }, function(n, e, a) {
    a(n, e(n) - e(n));
  }, function(n, e, a) {
    var _ = e(n),
      u = e(n),
      r = e(n),
      l = e(n);
    a(n, _(u, r, l));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) >> e(n));
  }, function(n, e, a) {
    a(n, new RegExp(e(n), e(n)));
  }, function(n, e, a, _) {
    var u = e(n),
      r = _(n);
    r.T[u] = void 0;
  }, function(n, e) {
    e(n)[e(n)] = e(n);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) !== l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) === e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) > l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) % l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) >= e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) * l(n));
  }, function(n, e, a) {
    a(n, !e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, e(n) === l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) << l(n));
  }, function(n, e) {
    n.W[0] = e(n);
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) >= l(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) * e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) >>> e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) != e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) <= l(n));
  }, function(n, e, a) {
    a(n, {});
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) | e(n));
  }, function(n, e, a, _, u, r) {
    var l = r[8];
    a(n, l(n) | l(n));
  }, function(n) {
    n.B = void 0;
  }, function(n, e, a, _, u, r) {
    var l = r[0];
    l(n, void 0);
  }, function() {
    return null;
  }, function(n, e, a, _, u) {
    var r = u[0];
    a(n, r[e(n)]);
  }, function(n, e) {
    var a = e(n);
    n.W[1].S = a;
  }, function(n, e, a, _) {
    for (var u = e(n), r = e(n), l = _(n); l; l = l.q())
      if (u in l.T) {
        l.T[u] = r;
        return;
      }
    for (var o = _(n); o; o = o.q())
      if (u in o.T) {
        o.T[u] = r;
        return;
      }
    throw 'ball';
  }];