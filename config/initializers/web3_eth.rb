module Web3
  module Eth
    class Contract

      class ContractMethod
        def do_call web3_rpc, contract_address, args
          data = '0x' + signature_hash + encode_hex(encode_abi(input_types, args) )
          return data unless constant
          response = web3_rpc.request "eth_call", [{ to: contract_address, data: data}, 'latest']

          string_data = [remove_0x_head(response)].pack('H*')
          return nil if string_data.empty?

          result = decode_abi output_types, string_data
          result.length==1 ? result.first : result
        end
      end

    end

    class Etherscan

      private

      def request api_module, action, args = {}

        uri = URI connect_options[:url]
        uri.query = URI.encode_www_form({
            module: api_module,
            action: action,
            apikey: api_key
                                        }.merge(args))

        Net::HTTP.start(uri.host, uri.port,
                        connect_options.merge(use_ssl: uri.scheme=='https' )) do |http|

          request = Net::HTTP::Get.new uri
          response = http.request request
          raise "Error code #{response.code} on request #{uri.to_s} #{request.body}" unless response.kind_of? Net::HTTPOK
          json = JSON.parse(response.body)
          raise "Response #{json['message']} on request #{uri.to_s}" if json['status'].present? && json['status']!='1'

          if json['error'].present?
            raise json['error']['message']
          end
          json['result']

        end
      end


    end


    class Rpc

      def request method, params = nil


        Net::HTTP.start(@uri.host, @uri.port, @connect_options) do |http|
          request = Net::HTTP::Post.new @uri, {"Content-Type" => "application/json"}
          request.body = {:jsonrpc => JSON_RPC_VERSION, method: method, params: params, id: @client_id}.compact.to_json
          response = http.request request

          raise "Error code #{response.code} on request #{@uri.to_s} #{request.body}" unless response.kind_of? Net::HTTPOK

          body = JSON.parse(response.body)

          if body['result']
            body['result']
          elsif body['error']
            raise "Error #{@uri.to_s} #{body['error']} on request #{@uri.to_s} #{request.body}"
          else
            raise "No response on request #{@uri.to_s} #{request.body}"
          end

        end

      end


    end

  end
end


