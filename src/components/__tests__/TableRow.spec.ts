import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import mockData from '@/types/mockData';
import TableRow from '../TableRow.vue';

describe('TableRow.vue', () => {
  it('check if row is rendered', async () => {
    const wrapper = await shallowMount(TableRow, {
      props: {
        rowData: mockData,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    expect(wrapper.findAll('.tableRow__cell').length).toBe(6);
  });
  it('check if event is emmited to toggle favorite', async () => {
    const wrapper = await shallowMount(TableRow, {
      props: {
        rowData: mockData,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    wrapper.find('.favorite').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('toggleFavorite');
  });
});
