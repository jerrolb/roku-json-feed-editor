const USER = 2138343463;
const PASS = -7326332;
const SALT = "a1Xd&#$l0C-";
const PEPPER = "**nv343%#jbB";
const hashCode = function(s) {
  let h = 0;
  let l = s.length;
  let i = 0;
  if (l > 0) {
    while (i < l) {
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
    }
  }
  return h;
};

export {
  USER,
  PASS,
  SALT,
  PEPPER,
  hashCode
};
