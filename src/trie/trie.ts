class TrieNode {
  private children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }

  addChild(child: string) {
    this.children.set(child, new TrieNode());
  }

  hasChild(child: string): boolean {
    return this.children.has(child);
  }

  getChild(child: string): TrieNode | null {
    const childNode = this.children.get(child);
    return childNode ? childNode : null;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let curr = this.root;
    for (const char of word) {
      if (!curr.hasChild(char)) {
        curr.addChild(char);
      }
      curr = curr.getChild(char);
    }

    curr.isEndOfWord = true;
  }

  search(word: string): boolean {
    let curr = this.root;
    for (const char of word) {
      if (!curr.hasChild(char)) return false;
      curr = curr.getChild(char);
    }
    return curr.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let curr = this.root;
    for (const char of prefix) {
      if (!curr.hasChild(char)) return false;
      curr = curr.getChild(char);
    }
    return true;
  }
}
