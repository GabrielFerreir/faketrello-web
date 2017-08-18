import { FakeTrelloPage } from './app.po';

describe('fake-trello App', () => {
  let page: FakeTrelloPage;

  beforeEach(() => {
    page = new FakeTrelloPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
