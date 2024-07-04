import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import axios from 'axios';
import mockData from '@/types/mockData';

jest.mock('axios');

describe('HomeView.vue', () => {
  beforeEach(() => {
    (axios.get as jest.Mock)
      .mockImplementation(() => Promise.resolve({
        data: {
          data: Array.from({ length: 25 }, (_, i) => ({ ...mockData, id: mockData.id + i })),
        },
      }));
  });
  it('renders page number correctly', async () => {
    const wrapper = await shallowMount(HomeView);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.find('#totalPages').text()).toBe('3');
  });

  it('renders previous and next buttons for mid pages', async () => {
    const wrapper = await shallowMount(HomeView);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    wrapper.vm.currentPage = 2;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('#currentPage').text()).toBe('2');
    expect(wrapper.find('.previous-btn').exists()).toBeTruthy();
    expect(wrapper.find('.next-btn').exists()).toBeTruthy();
  });
});
