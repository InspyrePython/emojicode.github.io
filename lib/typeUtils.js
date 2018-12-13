module.exports = {
  asciiName(name) {
    const codePoints = [];
    for (const character of name) {
      codePoints.push(character.codePointAt(0).toString(16));
    }
    return codePoints.join('_');
  },

  link(type) {
    if (type.reference) {
      type.reference = false;
      return `✴️${this.link(type)}`;
    }

    if (!type.type) {
      let str = `<a href="../${type.package}/${this.asciiName(type.name)}.html">${type.name}</a>`;
      if (type.arguments.length > 0) {
        str += `🐚${type.arguments.map(arg => this.link(arg)).join('')}🍆`;
      }
      return str;
    }

    if (type.type === 'Optional') {
      return `🍬${this.link(type.arguments[0])}`;
    }
    else if (type.type === 'Error') {
      return `🚨${this.link(type.arguments[0])}${this.link(type.arguments[1])}`;
    }
    else if (type.type === 'Callable') {
      const args = type.arguments.slice(1).map(arg => this.link(arg)).join('');
      const returnType = type.arguments[0];
      const returnLink = returnType.type !== 'NoReturn' ? `➡️${this.link(returnType)}` : '';
      return `🍇${args}${returnLink}🍉`;
    }
    else if (type.type === 'MultiProtocol') {
      const args = type.arguments.map(arg => this.link(arg)).join('');
      return `🍱${args}🍱`;
    }
    else if (type.type === 'Literal') {
      return type.name;
    }

    return '??';
  },
};
