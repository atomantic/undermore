_.mixin({
    /**
     * Compare one Semantic Versioning 2.0.0 string to another:
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
        var expression = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

        function parse(version) {
            if (typeof version !== 'string') {
                return null;
            }

            var match = version.match(expression);
            if (!match) {
                return null;
            }

            var prerelease = match[4] ? match[4].split('.') : [];
            if (_.some(prerelease, function(identifier) {
                return /^\d+$/.test(identifier) && identifier.length > 1 && identifier.charAt(0) === '0';
            })) {
                return null;
            }

            return {
                core: match.slice(1, 4),
                prerelease: prerelease
            };
        }

        function compareNumeric(leftNumber, rightNumber) {
            if (leftNumber.length !== rightNumber.length) {
                return leftNumber.length < rightNumber.length ? -1 : 1;
            }

            if (leftNumber === rightNumber) {
                return 0;
            }

            return leftNumber < rightNumber ? -1 : 1;
        }

        function compare(leftVersion, rightVersion) {
            var index;
            for (index = 0; index < 3; index += 1) {
                var coreComparison = compareNumeric(leftVersion.core[index], rightVersion.core[index]);
                if (coreComparison !== 0) {
                    return coreComparison;
                }
            }

            if (leftVersion.prerelease.length === 0 || rightVersion.prerelease.length === 0) {
                if (leftVersion.prerelease.length === rightVersion.prerelease.length) {
                    return 0;
                }

                return leftVersion.prerelease.length === 0 ? 1 : -1;
            }

            var length = Math.max(leftVersion.prerelease.length, rightVersion.prerelease.length);
            for (index = 0; index < length; index += 1) {
                if (index >= leftVersion.prerelease.length) {
                    return -1;
                }
                if (index >= rightVersion.prerelease.length) {
                    return 1;
                }

                var leftIdentifier = leftVersion.prerelease[index];
                var rightIdentifier = rightVersion.prerelease[index];
                var leftNumeric = /^\d+$/.test(leftIdentifier);
                var rightNumeric = /^\d+$/.test(rightIdentifier);

                if (leftNumeric && rightNumeric) {
                    var numericComparison = compareNumeric(leftIdentifier, rightIdentifier);
                    if (numericComparison !== 0) {
                        return numericComparison;
                    }
                } else if (leftNumeric !== rightNumeric) {
                    return leftNumeric ? -1 : 1;
                } else if (leftIdentifier !== rightIdentifier) {
                    return leftIdentifier < rightIdentifier ? -1 : 1;
                }
            }

            return 0;
        }

        if (!['=', '==', '===', '>', '>=', '<', '<='].includes(oper)) {
            return false;
        }

        var parsedLeft = parse(left);
        var parsedRight = parse(right);
        if (!parsedLeft || !parsedRight) {
            return false;
        }

        var result = compare(parsedLeft, parsedRight);
        if (oper === '=' || oper === '==' || oper === '===') {
            return result === 0;
        }
        if (oper === '>') {
            return result > 0;
        }
        if (oper === '>=') {
            return result >= 0;
        }
        if (oper === '<') {
            return result < 0;
        }

        return result <= 0;
    }
});
