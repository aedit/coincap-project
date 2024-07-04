import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import mockData from '@/types/mockData';
import DetailsView from '@/views/DetailsView.vue';

jest.mock('axios');

describe('DetailsView.vue', () => {
  beforeEach(() => {
    (axios.get as jest.Mock)
      .mockImplementation((id) => {
        if (id === `https://api.coincap.io/v2/assets/${mockData.id}`) {
          return Promise.resolve({
            data: {
              data: mockData,
            },
          });
        }
        return Promise.reject(new Error('No data found'));
      });
  });
  it('renders error message for wrong id', async () => {
    const mockRoute = {
      params: {
        id: '1',
      },
    };
    const wrapper = await shallowMount(DetailsView, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.errorMessage').exists()).toBeTruthy();
  });

  it('renders coins data for correct id', async () => {
    const mockRoute = {
      params: {
        id: 'abc',
      },
    };
    const wrapper = await shallowMount(DetailsView, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.errorMessage').exists()).toBeFalsy();
    expect(wrapper.vm.coinData).toStrictEqual(mockData);
  });
});
