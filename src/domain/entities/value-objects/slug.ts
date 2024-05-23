export class Slug {
  public value: String

  constructor(value: String) {
    this.value = value
  }

  /**
   * Receives a string and normalize ir as a slug
   *
   * Example: "An example title" => "an-exemple-title"
   *
   * @param text {string}
   *
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '-')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
