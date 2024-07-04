import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import mockData from '@/types/mockData';
import TableBody from '../TableBody.vue';
import TableRow from '../TableRow.vue';

describe('TableBody.vue', () => {
  const propsData = Array.from({ length: 8 }, (_, i) => ({ ...mockData, id: mockData.id + i }));

  it('check if all rows are rendered', async () => {
    const wrapper = await shallowMount(TableBody, {
      props: {
        tableData: propsData,
      },
      global: {
        stubs: {
          TableRow,
          RouterLink: RouterLinkStub,
        },
      },
    });
    expect(wrapper.findAll('.tableRow').length).toBe(9);
  });
  it('checks if favorite coin is toggled', async () => {
    const wrapper = await shallowMount(TableBody, {
      props: {
        tableData: propsData,
      },
      global: {
        stubs: {
          TableRow,
          RouterLink: RouterLinkStub,
        },
      },
    });
    wrapper.vm.toggleFavorite(propsData[1].id);
    wrapper.vm.toggleFavorite(propsData[2].id);
    expect(wrapper.vm.favorites.length).toBe(2);
    expect(wrapper.vm.favorites).toStrictEqual([propsData[1].id, propsData[2].id]);
  });
});
