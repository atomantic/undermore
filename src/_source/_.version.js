/**
 * Compare a semantic version number string to another:
 * 
 * 1.2.3-alpha < 1.2.3-alpha.1 < 1.2.3-alpha.beta < 1.2.3-beta < 1.2.3-beta.2 < 1.2.3-beta.11 < 1.2.3-rc.1 < 1.2.3
 *
 * @function module:undermore.version
 * @see {@link http://semver.org/ Semantic Versioning Standard}
 * @param {string} left The left version
 * @param {string} oper The operator to use for comparison ('==','>=','<=','<','>')
 * @param {string} right The right version
 * @return {bool} whether or not the versions resolved true with the comparitor
 * @example
 *  ok(_.version('1.2.3','<','2.0.0'), 'major version is smaller');
 *  ok(_.version('1.1.0','<','1.2.0'), 'minor version is smaller');
 *  ok(!_.version('1.1.0','>','1.2.0'), 'minor version is smaller');
 *  ok(_.version('1.0.10','>=','1.0.2'), 'patch version 10 is greater than or equal to 2');
 *  ok(_.version('1.2.3-alpha','<','1.2.3-alpha.1'));
 *  ok(_.version('1.2.3-alpha.1','<','1.2.3-alpha.beta'));
 *  ok(_.version('1.2.3-alpha.beta','<','1.2.3-beta'));
 *  ok(_.version('1.2.3-beta','<','1.2.3-beta.2'));
 *  ok(_.version('1.2.3-beta.2','<','1.2.3-beta.11'));
 *  ok(_.version('1.2.3-beta.11','<','1.2.3-rc.1'));
 *  ok(_.version('1.2.3-rc.1','<','1.2.3'));
 */
version: function(left, oper, right) {

    // is equal acceptable?
    var equal = oper.indexOf('=')!==-1,
        // we will remove all build metadata
        regMeta = /\+.*$/;

    // strip build metadata (not to be used for comparison)
    // e.g. '1.2.3+20140101081413' => '1.2.3'
    left = left.replace(regMeta);
    right = right.replace(regMeta);

    // see if we can bail early
    if(equal && left===right){
        // versions are exactly the same and that's good enough for us
        return true;
    }

    // use regex here instead of a series of splits since .match will return a
    // consistent array length and let use more easily parse out the results
    // 
    /*
     /^                     // start of the line
     (\d+).(\d+).(\d+)      // 1.2.3
     (?:-([a-z0-9.]+))?     // possible -pre.alpha.numeric.1.2.thing.and.such
                            // NOTE: we don't require termination of the string here with "$"
                            // so that we can gracefullly handle version strings that don't comply
                            // fully with SemVer (e.g. 2.0.2.rc1)
     /i,                    // case insensitive
     */
    var regSemVer = /^(\d+).(\d+).(\d+)(?:-([a-z0-9.]+))?/i,
        // produces a match array of [full, major, minor, patch, pre]
        // ["1.2.3-rc.1", "1", "2", "3", "rc.1"]
        // or
        // ["1.2.3", "1", "2", "3", undefined]
        arrLeft = left.match(regSemVer),
        arrRight = right.match(regSemVer),
        preLeft = arrLeft[4],
        preRight = arrRight[4],
        i,
        l,
        r,
        // have we hit a difference?
        hit;

    // skip full SemVer match (index 0) and loop to compare major.minor.patch
    for(i=1; i<4; i++){
        // 1.2.1 is greater than 1.2
        // attempt to parseInt on it, but if it's undefined:
        // e.g. 1.2.1 vs 1.2 (and we are comparing patch)
        // we will end up with l=1 and r=NaN, which won't compare right
        // so use 0 as a non-existent patch is < any existing patch
        l = parseInt(arrLeft[i],10) || 0;
        r = parseInt(arrRight[i],10) || 0;

        if(l!==r){ // there's a difference
            hit = true; // we don't need to check anything else
            break;
        }
    }
    if(!hit){
        // all the same so far
        // test pre-release version
        // at this point the rule of placement existence 
        // causing higher version shifts temporarily
        // 1.2 < 1.2.3 but 1.2.3 > 1.2.3-pre

        // if there is no pre-release on one side, that side is greater
        // 1.2.3-pre is an earlier version than 1.2.3 (1.2.3.112 < 1.2.3.Infinity)
        if(!preLeft){
            l = Infinity;
            if(preRight){
                // left > right by not existing
                r = 0; // kill the value
                hit = true;
            }
        }
        if(!preRight){
            r = Infinity;
            if(preLeft){
                // right > left by not existing
                l = 0;
                hit = true;
            }
        }
        if(!preLeft && !preRight){
            hit = true; // both are Infinity, no reason to try to split and compare parts
        }
    }
    if(!hit){
        // split the pre-release version and compare each part ([0-9a-zA-Z.]+)
        var pl = preLeft.split('.'),
            pr = preRight.split('.'),
            lenL = pl.length,
            lenR = pr.length,
            // we need to set the iteration limit to the longest one
            // (but we will stop 1 after the shortest)
            iters = lenL > lenR ? lenL : lenR;
        for(i=0; i<iters; i++){
            // pre-release part either won't exist, in which case
            // we will use -1 as the value (to mark non-existence as lower priority than existence)
            // if it's a number, we can parseInt to get an int for comparison
            // else it will become NaN
            // and we try to charCodeAt to convert the [a-zA-Z] to a number
            // e.g. 'alpha' => 97, 'beta' => 98, 'rc' => 114
            l = (i >= lenL) ? -1 : parseInt(pl[i],10) || pl[i].charCodeAt();
            r = (i >= lenR) ? -1 : parseInt(pr[i],10) || pr[i].charCodeAt();
            if(l!==r){
                break;
            }
        }
    }

    // at this point, l and r will be the first number in position that was not the same
    // or we will have made it through the loop and all were identical

    if(
        // equal
        (equal && l===r) ||
        // left is greater
        (oper.indexOf('>')!==-1 && l > r) ||
        // right is greater
        (oper.indexOf('<')!==-1 && l < r)
    ){
        return true;
    }

    // not the droid we are looking for
    return false;
}